Rails.application.routes.draw do

  root to: 'application#angular'

  resources :documents
end
