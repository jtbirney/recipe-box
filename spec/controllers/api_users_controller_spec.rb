require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:user) { User.create!(name: "User1", email: "user@website.com", password: "pass1", password_confirmation: "pass1") }

  describe "GET #index" do
    it "returns nil if user is not signed in" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      expect(returned_json[:user]).to eq nil
    end

    it "returnes current username and id if user is logged in" do
      # @controller = Api::V1::SessionsController.new
      # post :create, params: { user: { name: "User1", password: "pass1"} }
      # @controller = Api::V1::UsersController.new
      session[:user_id] = user.id
      get :index
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      returned_json = JSON.parse(response.body)
      expect(returned_json[:user]).to eq user.name
      expect(returned_json[:user_id]).to eq user.id
    end
  end
end

# feature "returns current user" do
#   scenario "returnes current username and id if user is logged in" do
#     post "/api/v1/sessions", params: { user: { name: "User1", password: "pass1"} }
#     get :index
#     expect(response.status).to eq 200
#     expect(response.content_type).to eq "application/json"
#     expect(returned_json[:user]).to eq user.name
#     expect(returned_json[:user_id]).to eq user.id
#   end
# end
