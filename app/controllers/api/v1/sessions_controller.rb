class Api::V1::SessionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def create
    user = User.find_by(name: login_params[:name])
    if user && user.authenticate(login_params[:password])
      log_in(user)
      render json: { status: 'SUCCESS', message: 'Account Created', user: user }, status: :created
    else
      if user
        render json: { status: 'FAILURE', message: "Invalid Password" }
      else
        render json: { status: 'FAILURE', message: "Username does not exist. Please Sign Up" }
      end
    end
  end

  def destroy
    log_out
    render json: { status: 'SUCCESS', message: "Log Out" }
  end

  private
  def login_params
    params.require(:user).permit(:name, :password)
  end
end
