class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates_presence_of :name
  validates_presence_of :email
  validates :email, uniqueness: true
  validates_presence_of :password

  has_secure_password

  has_many :user_recipes
  has_many :recipes, through: :user_recipes
end
