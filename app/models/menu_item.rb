class MenuItem < ApplicationRecord
  belongs_to :user
  belongs_to :recipe
end
