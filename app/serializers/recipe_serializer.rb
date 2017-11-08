class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :image, :ingredients, :directions, :saved, :menu

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
end
