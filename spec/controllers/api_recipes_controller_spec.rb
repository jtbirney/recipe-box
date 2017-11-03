require 'rails_helper'

RSpec.describe Api::V1::RecipesController, vcr: true, type: :controller do
  let!(:query) { "Chicken Soup" }

  describe "Index" do
    it "returns recipes" do
      VCR.use_cassette("search", record: :new_episodes) do
        response = Net::HTTP.get_response(URI("http://localhost:3000/api/v1/recipes/?query=#{query}"))
        returned_json = JSON.parse(response.body)

        expect(returned_json["recipes"]).to be_a_kind_of Array
        expect(returned_json["recipes"][0]["title"]).to include query
      end
    end
  end

  describe "Show" do
    it "shows the current user's saved recipes" do
      recipe = create(:recipe)
      recipe1 = create(:recipe)
      user = create(:user)
      user.recipes << recipe
      user.recipes << recipe1

      get :show, params: { id: user.id }, session: { user_id: user.id }
      returned_json = JSON.parse(response.body)
      expect(returned_json["recipes"]).to be_a_kind_of Array
      expect(returned_json["recipes"][0]["title"]).to eq recipe.title
      expect(returned_json["recipes"][0]["url"]).to eq recipe.url
      expect(returned_json["recipes"][1]["title"]).to eq recipe1.title
      expect(returned_json["recipes"][1]["url"]).to eq recipe1.url
    end

    it "gives an error message if the user is not logged in" do
      user = create(:user)

      get :show, params: { id: user.id }
      returned_json = JSON.parse(response.body)
      expect(returned_json["error"]).to eq "Hmm... We can't find your recipes. Have you logged in?"
    end
  end

  describe "Create" do
    it "creates a new recipe and adds it to the current user's collection of recipes if the recipe is not saved in the database already" do
      recipe = { title: Faker::Food.dish, url: Faker::Internet.url }
      user = create(:user)

      expect { post :create, params: { recipe: recipe }, session: { user_id: user.id } }.to change { Recipe.count }.by(1).and change { user.recipes.count }.by(1)
    end

    it "adds the recipe to the user's collection of recipes if the recipe already exits" do
      recipe = { title: Faker::Food.dish, url: Faker::Internet.url }
      Recipe.create(recipe)
      user = create(:user)

      expect { post :create, params: { recipe: recipe }, session: { user_id: user.id } }.to change { Recipe.count }.by(0).and change { user.recipes.count }.by(1)
    end
  end

  describe "Destroy" do
    it "removes the recipe from the current user's collection, but it does not delete it from the database" do
      recipe = create(:recipe)
      user = create(:user)
      user.recipes << recipe

      expect{ delete :destroy, params: { id: recipe.id }, session: { user_id: user.id } }.to change {Recipe.count}.by(0).and change { user.recipes.count }.by(-1)
    end
  end
end
