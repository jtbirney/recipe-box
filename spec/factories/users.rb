FactoryBot.define do
  factory :user do
    name Faker::StarWars.character
    email Faker::Internet.email
    password "password1"
    password_confirmation "password1"
  end
end
