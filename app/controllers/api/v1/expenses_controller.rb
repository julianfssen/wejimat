class Api::V1::ExpensesController < ApplicationController
  before_action :authorized
  before_action :set_expense, only: [:show, :update, :destroy]

  # GET /expenses
  def index
    @expenses = current_user.expenses

    render json: @expenses
  end

  # GET /expenses/1
  def show
    render json: @expense
  end

  # POST /expenses
  def create
    @expense = current_user.expenses.new(expense_params)

    if @expense.save
      render json: @expense, status: :created, location: api_v1_expenses_path
    else
      pp @expense.errors
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /expenses/1
  def update
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/1
  def destroy
    @expense.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_expense
    @expense = Expense.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def expense_params
    params.require(:expense).permit(:name, :amount, payment_channel_attributes: [:name])
  end

  def current_user
    @current_user ||= logged_in_user
  end
end
