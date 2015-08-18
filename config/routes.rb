Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users
  namespace :api, defaults: {format: :json} do
    scope "/v1" do
      resources :meals
      resources :users, only: [:create]
      get '/users/me', to: 'users#show'
      put '/users', to: 'users#update'
    end
  end

  root "home#index"
end
