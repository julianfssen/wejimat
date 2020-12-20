class AddExpenseToPaymentChannel < ActiveRecord::Migration[6.0]
  def change
    add_reference :payment_channels, :expense, null: false, foreign_key: true
  end
end
