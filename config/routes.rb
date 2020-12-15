Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :transactions
      resources :payment_channels
    end
  end
end
