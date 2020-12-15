class PaymentChannel < ApplicationRecord
  belongs_to :_transaction, class_name: 'Transaction'
end
