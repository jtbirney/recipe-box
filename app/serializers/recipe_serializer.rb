class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :image, :ingredients, :directions, :saved, :menu, :note

  def saved
    if current_user
      return current_user.recipes.include?(object)
    else
      return false
    end
  end

  def menu
    if current_user
      return current_user.menu.include?(object)
    else
      return false
    end
  end

  def note
    if current_user
      user_recipes = current_user.user_recipes
      user_recipe = user_recipes.find_by recipe: object
      if user_recipe
        return {note_id: user_recipe.id, text: user_recipe.note}
      else
        return nil
      end
    else
      return nil
    end
  end
end
