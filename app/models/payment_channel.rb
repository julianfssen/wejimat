# frozen_string_literal: true

class PaymentChannel < ApplicationRecord
  belongs_to :expense
end
