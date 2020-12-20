require 'bcrypt'

class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  has_many :expenses, dependent: :destroy
end
