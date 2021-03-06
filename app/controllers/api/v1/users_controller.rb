# frozen_string_literal: true
#
class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorized, except: [:create, :login]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      payload = { user_id: @user.id }
      token = encode_token(payload)
      render json: { user: @user, token: token }, status: :created, location: api_v1_user_path(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(username: params[:user][:username])

    if @user&.authenticate(params[:user][:password])
      payload = { user_id: @user.id }
      token = encode_token(payload)
      render json: { user: @user, token: token }, status: :ok, location: api_v1_user_path(@user)
    else
      render json: { error: 'Invalid username or password' }
    end
  end

  def auto_login
    render json: @user
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
