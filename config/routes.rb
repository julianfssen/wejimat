Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :expenses
      resources :payment_channels
      post 'login', to: 'users#login'
    end
  end
end
