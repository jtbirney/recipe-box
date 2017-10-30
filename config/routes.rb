Rails.application.routes.draw do

  root "recipes#index"
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :recipes, only: [:index]
  resources :users
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index]
    end
  end
end
