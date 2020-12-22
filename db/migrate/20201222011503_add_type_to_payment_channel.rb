class AddTypeToPaymentChannel < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_channels, :type, :string
  end
end
