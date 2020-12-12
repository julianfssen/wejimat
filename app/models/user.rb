require 'securerandom'

class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  before_create :set_auth_token

  private

  def set_auth_token
    self.auth_token = generate_auth_token
  end

  def generate_auth_token
    SecureRandom.uuid.gsub(/\-/, '')
  end
end
