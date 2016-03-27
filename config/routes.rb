Rails.application.routes.draw do

  root to: 'application#angular'

  resources :documents, only: [:show, :index, :create, :new]
end
