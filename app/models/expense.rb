class Expense < ApplicationRecord
  belongs_to :user
  has_one :payment_channel, dependent: :destroy
  accepts_nested_attributes_for :payment_channel

  scope :filter_by_payment_channel, ->(payment_channel) {
    joins(:payment_channel)
      .where(payment_channels: { type: payment_channel })
  }

  scope :filter_by_year, ->(year) {
    where("date_part('year', created_at) = ?", year)
  }

  class << self
    def filter_by_query(params)
      payment_channel = params.dig(:payment_channel)
      month = params.dig(:month)
      date = params.dig(:date)

      expenses = filter_by_payment_channel(payment_channel) if payment_channel.present?
      expenses = filter_by_month(month) if month.present?
      expenses = filter_by_date(date) if date.present?
      expenses
    end

    def filter_by_month(month)
      month_index = Date::MONTHNAMES.index(month)
      where("date_part('month', created_at) = ?", month_index)
    end

    def filter_by_date(date)
      formatted_date = Time.zone.parse(date);
      where(created_at: formatted_date.beginning_of_day..formatted_date.end_of_day)
    end
  end
end
