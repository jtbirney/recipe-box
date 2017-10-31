class Recipe < ApplicationRecord
  validates_presence_of :title
  validates_presence_of :body

  has_many :user_recipes
  has_many :users, through: :user_recipes
end
