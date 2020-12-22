Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :expenses do
      end
      resources :payment_channels
    end
  end
end
