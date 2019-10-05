Rails.application.routes.draw do
  get 'cities/index'

  resources :cities

  root 'cities#index'
end
