class Expense < ApplicationRecord
  belongs_to :user
  has_one :payment_channel, dependent: :destroy
  accepts_nested_attributes_for :payment_channel

  scope :by_payment_channel, ->(payment_channel) {
    joins(:payment_channel)
      .where(payment_channels: { type: payment_channel })
  }
end
