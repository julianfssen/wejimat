require 'bcrypt'

class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  has_many :transactions, dependent: :destroy
end
