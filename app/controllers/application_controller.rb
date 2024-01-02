# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::Base
  before_action :authorize

  # { Authorization: 'Bearer <token>' }
  def bearer_token
    r = request.headers['Authorization']
    r.split(' ')[1] if r
  end

  def logged_in_user
    dtk = JwtService.decode(bearer_token: bearer_token)
    return unless dtk

    user_id = dtk[0]['user_id']
    @user = User.find_by(id: user_id)
  end

  def authorize
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in_user.present?
  end
end
