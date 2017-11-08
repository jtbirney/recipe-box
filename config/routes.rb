Rails.application.routes.draw do

  root "recipes#index"
  get    '/signup',  to: 'recipes#index'
  get    '/signin',  to: 'recipes#index'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/menu', to: 'recipes#index'
  get '/api/v1/search', to: 'api/v1/recipes#search'

  resources :recipes, only: [:index, :show, :new]
  resources :users
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:show, :create, :update, :destroy]
      resources :users, only: [:index, :show, :create] do
        resources :recipes, only: [:index]
      end
      resources :sessions, only: [:create, :destroy]
      resources :menu_items, only: [:index, :create, :destroy]
      resources :user_recipes, only: [:update]
    end
  end
end
