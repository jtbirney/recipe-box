require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  describe "Create" do
    it "logs in and returns the user" do
      user = User.create!(name: "User1", email: "user@website.com", password: "pass1", password_confirmation: "pass1")
      post :create, params: { user: { name: "User1", password: "pass1" } }

      returned_json = JSON.parse(response.body)
      expect(returned_json["user"]["name"]).to eq(user.name)
      expect(returned_json["user"]["id"]).to eq(user.id)
      expect(session[:user_id]).to eq user.id
    end

    it "returns an error message if the username does not exist" do
      user = User.create!(name: "User2", email: "user2@website.com", password: "pass1", password_confirmation: "pass1")
      post :create, params: { user: { name: "User1", password: "pass1" } }

      returned_json = JSON.parse(response.body)
      expect(returned_json["message"]).to eq "Username does not exist. Please Sign Up"
      expect(session[:user_id]).to eq nil
    end

    it "returns an error message if the password is incorrect" do
      user = User.create!(name: "User3", email: "user3@website.com", password: "pass1", password_confirmation: "pass1")
      post :create, params: { user: { name: "User3", password: "pass" } }

      returned_json = JSON.parse(response.body)
      expect(returned_json["message"]).to eq "Invalid Password"
      expect(session[:user_id]).to eq nil
    end
  end

  describe "Destroy" do
    it "logs a user out" do
      user = User.create!(name: "User3", email: "user3@website.com", password: "pass1", password_confirmation: "pass1")
      delete :destroy, params: { id: user.id }, session: { user_id: user.id }

      returned_json = JSON.parse(response.body)
      expect(returned_json["message"]).to eq "Successfully signed out"
      expect(session[:user_id]).to eq nil
    end
  end
end
