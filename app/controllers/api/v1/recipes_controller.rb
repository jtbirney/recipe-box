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
        recipe = Recipe.find_by(url: url)
        if !recipe
          recipe = Recipe.create(url: url, title: title, image: image)
          recipe.save
        end
        recipes << recipe
      end
    end

    # Test data to avoid making repeated API calls
    # recipes = Recipe.all

    render json: { recipes: recipes }
  end

  def show
    recipe = Recipe.find(params[:id])
    if recipe.url
      if recipe.ingredients == nil
        recipe.ingredients = recipe.get_ingredients
      end
      if recipe.directions == nil
        recipe.directions = recipe.get_directions
      end
      if recipe.image == nil
        recipe.image = recipe.get_image
      end
    end
    recipe.save
    render json: { recipe: recipe }
  end

  def create
    recipe = Recipe.find_by(url: recipe_params[:url])
    if recipe && !current_user.recipes.include?(recipe)
      if recipe.ingredients == nil
        recipe.ingredients = recipe.get_ingredients
      end
      if recipe.directions == nil
        recipe.directions = recipe.get_directions
      end
      if recipe.image == nil
        recipe.image = recipe.get_image
      end
      recipe.save
      current_user.recipes << recipe
    elsif !recipe
      recipe = Recipe.new(recipe_params)
      if recipe.title == nil
        recipe.title = recipe.get_title
      end
      if recipe.ingredients == nil
        recipe.ingredients = recipe.get_ingredients
      end
      if recipe.directions == nil
        recipe.directions = recipe.get_directions
      end
      if recipe.image == nil
        recipe.image = recipe.get_image
      end
      recipe.save
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
