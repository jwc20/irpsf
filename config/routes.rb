Rails.application.routes.draw do
#   get "sessions/new"
#   get "sessions/create"
#   get "sessions/destroy"
  mount ActionCable.server, at: '/cable'

  # root 'messages#index'

  resources :users
  resources :messages

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # get "/authorize", to: "users#show"
  get "/me", to: "users#show"


  get "up" => "rails/health#show", as: :rails_health_check
end


