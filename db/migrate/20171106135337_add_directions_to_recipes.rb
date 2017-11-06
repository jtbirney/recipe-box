class AddDirectionsToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :directions, :text, array: true
  end
end
