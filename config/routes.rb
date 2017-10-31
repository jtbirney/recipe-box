Rails.application.routes.draw do

  root "recipes#index"
  get    '/signup',  to: 'recipes#index'
  get    '/signin',  to: 'recipes#index'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :recipes, only: [:index]
  resources :users
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index]
      resources :users, only: [:index, :create]
      resources :sessions, only: [:create, :destroy]
    end
  end
end
