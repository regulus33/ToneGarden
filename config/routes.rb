Rails.application.routes.draw do
  get '/', to: 'initializers#index'
  get '/signup', to: 'initializers#index'
  resources :users, only: :create do
    collection do
      post 'login'

    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
