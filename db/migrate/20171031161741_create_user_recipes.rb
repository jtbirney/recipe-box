class CreateUserRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :user_recipes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :recipe, null: false

      t.timestamps
    end
  end
end
