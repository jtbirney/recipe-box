Rails.application.routes.draw do
  root "recipes#index"
  resources :recipes, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index]
    end
  end
end
