class RemoveNullFalseOnRecipes < ActiveRecord::Migration[5.1]
  def up
    change_column :recipes, :body, :string, null: true
  end

  def down
    change_column :recipes, :body, :string, null: false
  end
end
