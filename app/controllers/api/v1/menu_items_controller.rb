class Api::V1::MenuItemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    recipes = current_user.menu
    render json: recipes
  end

  def create
    recipe = Recipe.find(recipe_params[:id])
    if !current_user.recipes.include?(recipe)
      current_user.recipes << recipe
    end
    if !current_user.menu.include?(recipe)
      current_user.menu << recipe
    end
    render json: recipe
  end

  def destroy
    recipe = Recipe.find(params[:id])
    current_user.menu.delete(recipe)
    render json: { status: 'SUCCESS', message: 'Recipe Removed', recipe: recipe }, status: :ok
  end

  private
  def recipe_params
    params.require(:recipe).permit(:id)
  end
end
