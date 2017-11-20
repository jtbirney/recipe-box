require 'rails_helper'

RSpec.describe Api::V1::RecipesController, vcr: true, type: :controller do
  let!(:query) { "Chicken Soup" }

  describe "Search" do
    it "returns recipes from search query" do
      VCR.use_cassette("search", record: :new_episodes) do
        response = Net::HTTP.get_response(URI("http://localhost:3000/api/v1/recipes/?query=#{query}"))
        returned_json = JSON.parse(response.body)

        expect(returned_json["recipes"]).to be_a_kind_of Array
        expect(returned_json["recipes"][0]["title"]).to include query
      end
    end
  end

  describe "Index" do
    it "shows the current user's saved recipes" do
      recipe = create(:recipe)
      recipe1 = create(:recipe)
      user = create(:user)
      user.recipes << recipe
      user.recipes << recipe1

      get :index, params: { user_id: user.id }, session: { user_id: user.id }
      returned_json = JSON.parse(response.body)
      expect(returned_json).to be_a_kind_of Array
      expect(returned_json[0]["title"]).to eq recipe.title
      expect(returned_json[0]["url"]).to eq recipe.url
      expect(returned_json[1]["title"]).to eq recipe1.title
      expect(returned_json[1]["url"]).to eq recipe1.url
    end

    it "gives an error message if the user is not logged in" do
      user = create(:user)

      get :index, params: { user_id: user.id }
      returned_json = JSON.parse(response.body)
      expect(returned_json["error"]).to eq "Hmm... We can't find your recipes. Have you logged in?"
    end
  end

  describe "Show" do
    it "shows a recipe" do
      VCR.use_cassette("show", record: :new_episodes) do
        recipe = create(:recipe, url: "http://www.finecooking.com/recipe/chicken-pot-pie")

        get :show, params: { id: recipe.id }
        returned_json = JSON.parse(response.body)
        expect(returned_json).to be_a_kind_of Hash
        expect(returned_json["title"]).to eq recipe.title
        expect(returned_json["url"]).to eq recipe.url
        expect(returned_json["image"]).to eq recipe.image
      end
    end
  end

  describe "Create" do
    it "creates a new recipe and adds it to the current user's collection of recipes if the recipe is not saved in the database already" do
      VCR.use_cassette("create", record: :new_episodes) do
        recipe = Recipe.new(title: "Chicken Pot Pie", url: "http://www.finecooking.com/recipe/chicken-pot-pie")
        user = create(:user)

        expect { post :create, params: { recipe: { title: recipe.title, url: recipe.url } }, session: { user_id: user.id } }.to change { Recipe.count }.by(1).and change { user.recipes.count }.by(1)
      end
    end

    it "adds the recipe to the user's collection of recipes if the recipe already exits" do
      VCR.use_cassette("add_recipe", record: :new_episodes) do
        recipe = create(:recipe)
        recipe.url = "http://www.finecooking.com/recipe/chicken-pot-pie"
        recipe.save
        user = create(:user)

        expect { post :create, params: { recipe: { title: recipe.title, url: recipe.url } }, session: { user_id: user.id } }.to change { Recipe.count }.by(0).and change { user.recipes.count }.by(1)
      end
    end
  end

  describe "Update" do
    it "updates the ingredients for the recipe" do
      recipe = create(:recipe)

      patch :update, params: { id: recipe.id, ingredients: ["1 cup flour", "", "6 tablespoons water"] }
      returned_json = JSON.parse(response.body)
      expect(returned_json["ingredients"]).to eq ["1 cup flour", "6 tablespoons water"]
    end

    it "updates the directions for the recipe" do
      recipe = create(:recipe)

      patch :update, params: { id: recipe.id, directions: ["", "Mix flour and water together", "Now you have glue"] }
      returned_json = JSON.parse(response.body)
      expect(returned_json["directions"]).to eq ["Mix flour and water together", "Now you have glue"]
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
