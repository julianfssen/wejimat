class AddExpenseDateToExpense < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :expense_date, :datetime
  end
end
