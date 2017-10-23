class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :url
      t.string :image
      
      t.timestamps
    end
  end
end
