class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates_presence_of :name
  validates_presence_of :email
  validates :email, uniqueness: true
  validates_presence_of :password
  
  has_secure_password
end
