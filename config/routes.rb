Rails.application.routes.draw do

  root to: 'application#angular'

  resources :documents
  resources :user_docs, only: [:create, :destroy, :update]
  resources :users, only: [:show]

  get '/users/current/user', to: 'users#current'
  patch '/documents/update_score/:id', to: 'documents#update_score'

  get 'auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy', as: 'log_out'

  get '/auth/facebook', as: 'facebook_login'
  get '/auth/google', as: 'google_login'
  get '/auth/twitter', as: 'twitter_login'
  get '/auth/linkedin', as: 'linkedin'

  get 'auth/failure', to: redirect('home')

end
