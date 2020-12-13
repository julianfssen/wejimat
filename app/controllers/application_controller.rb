require 'jwt'

JWT_SECRET = 'WwW3j!m$4Tt!'.freeze

class ApplicationController < ActionController::API
  before_action :authorized

  private

  def auth_header
    request.headers['Authorization']
  end

  def encode_token(payload)
    JWT.encode(payload, JWT_SECRET, 'HS256')
  end

  def decode_token
    return unless auth_header

    token = auth_header.split('')[1]
    begin
      JWT.decode(token, JWT_SECRET, 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  def logged_in_user
    return false unless decoded_token

    uid = decoded_token[0]['user_id']
    @user = User.find_by(id: uid)
  end

  def logged_in?
    logged_in_user
  end

  def authorized
    render json: { message: 'Please login.' }, status: :unauthorized unless logged_in?
  end
end
