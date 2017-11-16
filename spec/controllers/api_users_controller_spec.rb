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
      get :index, session: { user_id: user.id }
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      returned_json = JSON.parse(response.body)
      expect(returned_json["name"]).to eq user.name
      expect(returned_json["id"]).to eq user.id
    end
  end

  describe "POST #create" do
    it "creates a new User object with valid params" do
      valid_params = {
        name: "User2",
        email: "User2@website.com",
        password: "password1",
        password_confirmation: "password1"
      }
      post :create, params: { user: valid_params }
      expect(response.status).to eq 201
      expect(response.content_type).to eq "application/json"
      returned_json = JSON.parse(response.body)
      expect(returned_json["user"]["name"]).to eq valid_params[:name]
      expect(returned_json["user"]["email"]).to eq valid_params[:email].downcase
    end

    it "does not create a user object with invalid params" do
      invalid_params = {
        name: "User2",
        email: "User2@website.com",
        password: "password1",
        password_confirmation: "password"
      }
      post :create, params: { user: invalid_params }
      returned_json = JSON.parse(response.body)
      expect(returned_json["message"]).to eq "Error creating account"
      expect(returned_json["errors"]["password_confirmation"]).to eq ["doesn't match Password"]
    end
  end
end
