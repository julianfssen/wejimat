require 'bcrypt'

class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_secure_password
end
