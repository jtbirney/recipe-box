class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if logged_in?
      render json: User.find(current_user.id)
    else
      render json: { user: nil }
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      log_in user
      render json: { status: 'SUCCESS', message: 'Account Created', user: user }, status: :created
    else
      errors = user.errors
      render json: { status: 'FAILURE', message: "Error creating account", errors: errors }
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
