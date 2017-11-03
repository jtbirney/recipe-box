class Api::V1::RecipesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    url = "https://api.edamam.com/search?q=#{params[:query]}&app_id=#{ENV["RECIPES_APP_ID"]}&app_key=#{ENV["RECIPES_API_KEY"]}"
    params.each do |key, value|
      key_snake = key.underscore
      key_dash = key_snake.gsub(/_/, '-')
      if value == "true"
        if key_dash == "balanced" || key_dash == "low-fat" || key_dash == "high-protien" ||key_dash == "low-carb"
          url << "&diet=#{key_dash}"
        else
          url << "&health=#{key_dash}"
        end
      end
    end
    if params[:from]
      url << "&from=#{params[:from]}"
    end
    if params[:ingredients]
      url << "&ingr=#{params[:ingredients]}"
    end

    # CODE TO GET RECIPES FROM EDEMAN API
    response = HTTParty.get(url)
    hits = response.parsed_response["hits"]
    recipes = []

    if hits.count > 0
      hits.each do |hit|
        url = hit["recipe"]["url"]
        title = hit["recipe"]["label"]
        image = hit["recipe"]["image"]
        recipes.push({ url: url, title: title, image: image })
      end
    end

    # Test data to avoid making repeated API calls
    # response = {
    #   "hits": [
    #     {
    #       "recipe": {
    #         "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_121b40b4af5f8f9c3dbc0272cc1a70a5",
    #         "label": params[:query],
    #         "image": "https://www.edamam.com/web-img/b4e/b4ecf425e5fcd21390a1203976f5fef8.jpg",
    #         "source": "Epicurious",
    #         "url": "http://www.epicurious.com/recipes/food/views/Chicken-Breast-with-Salsa-242444"
    #       }
    #     },
    #     {
    #       "recipe": {
    #         "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_a95b1340fb3d2945287a4b31daf1c94f",
    #         "label": "Grilled stuffed chicken breast",
    #         "image": "https://www.edamam.com/web-img/ac9/ac9d4c23885c77b2747a798ff756b862.jpg",
    #         "source": "La Cucina Italiana",
    #         "url": "http://lacucinaitalianamagazine.com/recipe/grilled_stuffed_chicken_breast_"
    #       }
    #     },
    #     {
    #       "recipe": {
    #         "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_7b401f7932461d2c200de073b27f293c",
    #         "label": "Chicken Breast with Fresh Sage",
    #         "image": "https://www.edamam.com/web-img/80b/80b93a7122b7146dea2af3212a4f64a9.JPG",
    #         "source": "Food52",
    #         "url": "https://food52.com/recipes/2451-chicken-breast-with-fresh-sage"
    #       }
    #     },
    #     {
    #       "recipe": {
    #         "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_121b40b4af5f8f9c3dbc0272cc1a70a5",
    #         "label": url,
    #         "image": "https://www.edamam.com/web-img/b4e/b4ecf425e5fcd21390a1203976f5fef8.jpg",
    #         "source": "Epicurious",
    #         "url": "http://www.epicurious.com/recipes/food/views/Chicken-Breast-with-Salsa-242444"
    #       }
    #     }
    #   ]
    # }
    #
    # hits = response[:hits]
    # recipes = []
    #
    # if hits.count > 0
    #   hits.each do |hit|
    #     url = hit[:recipe][:url]
    #     title = hit[:recipe][:label]
    #     image = hit[:recipe][:image]
    #     recipes.push({ url: url, title: title, image: image })
    #   end
    # end

    render json: { recipes: recipes }
  end

  def show
    if current_user && current_user.id == params[:id].to_i
      render json: { recipes: current_user.recipes}
    else
      render json: { error: "Hmm... We can't find your recipes. Have you logged in?" }
    end
  end

  def create
    recipe = Recipe.find_by(url: recipe_params[:url])
    if recipe && !current_user.recipes.include?(recipe)
      current_user.recipes << recipe
    elsif !recipe
      recipe = Recipe.create(recipe_params)
      recipe.title = recipe.get_title
      recipe.ingredients = recipe.get_ingredients
      current_user.recipes << recipe
    end
    render json: { status: 'SUCCESS', message: 'Recipe Added', recipe: recipe }, status: :created
  end

  def destroy
    recipe = Recipe.find(params[:id])
    current_user.recipes.delete(recipe)
    render json: { status: 'SUCCESS', message: 'Recipe Removed', recipe: recipe }, status: :ok
  end

  private
  def recipe_params
    params.require(:recipe).permit(:title, :url, :image)
  end
end
