class RemoveBodyFromRecipe < ActiveRecord::Migration[5.1]
  def up
    remove_column :recipes, :body
  end

  def down
    add_column :recipes, :body, :string
  end
end
