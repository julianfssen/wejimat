# frozen_string_literal: true

class Api::V1::PaymentChannelsController < ApplicationController
  before_action :set_payment_channel, only: [:show, :update, :destroy]
  before_action :authorized

  # GET /payment_channels
  def index
    @payment_channels = { channels: ['Boost', 'Grab', 'Touch N Go', 'Cash'] }

    render json: @payment_channels
  end

  # GET /payment_channels/1
  def show
    render json: @payment_channel
  end

  # POST /payment_channels
  def create
    @payment_channel = PaymentChannel.new(payment_channel_params)

    if @payment_channel.save
      render json: @payment_channel, status: :created, location: @payment_channel
    else
      render json: @payment_channel.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payment_channels/1
  def update
    if @payment_channel.update(payment_channel_params)
      render json: @payment_channel
    else
      render json: @payment_channel.errors, status: :unprocessable_entity
    end
  end

  # DELETE /payment_channels/1
  def destroy
    @payment_channel.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment_channel
      @payment_channel = PaymentChannel.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def payment_channel_params
      params.require(:payment_channel).permit(:name)
    end
end
