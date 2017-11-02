FactoryBot.define do
  factory :recipe do
    title Faker::Food.dish
    body Faker::Food.ingredient
    url Faker::Internet.url
    image Faker::Internet.url
  end
end
