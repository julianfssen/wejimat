Rails.application.routes.draw do
  resources :payment_channels
  namespace :api do
    namespace :v1 do
      resources :users
      resources :transactions
    end
  end
end
