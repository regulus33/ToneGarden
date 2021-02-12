# rubocop:disable Style/AccessModifierDeclarations]
# Signup and Login
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authorize

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: UserSerializer.new(user).serialized_json, token: JwtService.encode_token({ user_id: user.id }) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def login
    user = User.find_by(email: user_params[:email])
    unless user&.authenticate(user_params[:password])
      render json: { errors: ['bad request'] }, status: :bad_request
      return
    end
    token = JwtService.encode_token({ user_id: user.id })
    render json: { user: UserSerializer.new(user).serialized_json, token: token }
  end

  private def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

