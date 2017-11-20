FactoryBot.define do
  factory :recipe do
    title Faker::Food.dish
    url Faker::Internet.url
    image Faker::Internet.url
    ingredients [Faker::Food.measurement, Faker::Food.measurement]
    directions [Faker::Book.title, Faker::Book.title]
  end
end
