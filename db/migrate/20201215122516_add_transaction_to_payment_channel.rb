class AddTransactionToPaymentChannel < ActiveRecord::Migration[6.0]
  def change
    add_reference :payment_channels, :transaction, null: false, foreign_key: true
  end
end
