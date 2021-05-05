# rubocop:disable Style/AccessModifierDeclarations]
# SignupScreen and Login
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authorize

  APP_NAME = 'binaura'

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

  def guest
    anonymous_id = SecureRandom.uuid
    user = User.new(anonymous_id: anonymous_id)
    user.password = SecureRandom.hex(6)
    user.email = SecureRandom.hex(6) + '@' + APP_NAME + '.com'

    if user.save
      render json: { user: UserSerializer.new(user).serialized_json, token: JwtService.encode_token({ user_id: user.id }) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def logout
    logged_in_user
  end

  private def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

