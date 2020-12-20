class Expense < ApplicationRecord
  belongs_to :user
  has_one :payment_channel, dependent: :destroy
  accepts_nested_attributes_for :payment_channel
end
