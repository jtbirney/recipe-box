class Api::V1::RecipesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user && current_user.id == params[:user_id].to_i
      render json: current_user.recipes
    else
      render json: { error: "Hmm... We can't find your recipes. Have you logged in?" }
    end
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
    render json: recipe
  end

  def create
    recipe = Recipe.find_by(url: recipe_params[:url])

    if recipe && !current_user.recipes.include?(recipe)
      current_user.recipes << recipe
    elsif !recipe
      recipe = Recipe.new(recipe_params)
      if recipe.title == nil
        recipe.title = recipe.get_title
      end
      current_user.recipes << recipe
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

    render json: recipe
  end

  def update
    recipe = Recipe.find(params[:id])
    if params[:ingredients]
      recipe.update_attributes(ingredients: params[:ingredients])
      recipe.ingredients.delete("")
    elsif params[:directions]
      recipe.update_attributes(directions: params[:directions])
      recipe.directions.delete("")
    end
    recipe.save
    render json: recipe
  end

  def destroy
    recipe = Recipe.find(params[:id])
    current_user.recipes.delete(recipe)
    current_user.menu.delete(recipe)
    render json: { status: 'SUCCESS', message: 'Recipe Removed', recipe: recipe }, status: :ok
  end

  def search
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
        ingredients = hit["recipe"]["ingredientLines"]
        recipe = Recipe.find_by(url: url)
        if !recipe
          recipe = Recipe.new(url: url, title: title, image: image, ingredients: ingredients)
          recipe.save
        end
        recipes << recipe
      end
    end

    # Test data to avoid making repeated API calls
    # recipes = Recipe.all

    render json: recipes
  end

  private
  def recipe_params
    params.require(:recipe).permit(:title, :url, :image, :ingredients, :directions)
  end
end
