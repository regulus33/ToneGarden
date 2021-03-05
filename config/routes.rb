Rails.application.routes.draw do
  # React Router
  get '/', to: 'initializers#index'
  get '/signup', to: 'initializers#index'
  get '/presets', to: 'initializers#index'

  # Json api
  get '/api/presets', to: 'presets#index'
  resources :users, only: :create do
    collection do
      post 'login'
    end
  end
  # TODO: standardize route names
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
