require "rails_helper"

feature 'sessions conroller' do
  include RSpec::Rails::ControllerExampleGroup
  let!(:user) { User.create!(name: "User1", email: "user@website.com", password: "pass1", password_confirmation: "pass1") }

  scenario 'current user request if user is signed in' do
    @controller = Api::V1::SessionsController.new
    post :create, params: { user: { name: "User1", password: "pass1"} }
    binding.pry
    expect(response.status).to eq 200
    returned_json = JSON.parse(response.body)
    expect(returned_json[:user]).to eq user.name
    expect(returned_json[:user_id]).to eq user.id
  end
end
