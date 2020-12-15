class Transaction < ApplicationRecord
  belongs_to :user
  has_one :payment_channel, dependent: :destroy
end
