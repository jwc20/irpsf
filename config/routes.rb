Rails.application.routes.draw do
  mount ActionCable.server, at: '/cable'

  # root 'messages#index'

  resources :users
  resources :messages

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get "up" => "rails/health#show", as: :rails_health_check
end


