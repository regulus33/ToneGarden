Rails.application.routes.draw do
  # React Router
  # NOTE: They should all match verbatim every React Router Route you have in play
  # initializers#index is the source of React and all front end code for this app,
  # if not downloaded yet, user will get the bundle otherwise React Rails finds the current js
  # Runtime/cached scripts and React Router will handle the behavior at this URI
  get '/', to: 'initializers#index'
  get '/signup', to: 'initializers#index'
  get '/presets', to: 'initializers#index'
  get '/preset_show/:preset_id', to: 'initializers#index'

  # Json api
  get '/api/presets', to: 'presets#index'
  get '/api/preset_show/:preset_id', to: 'presets#show'
  resources :users, only: :create do
    collection do
      post 'login'
    end
  end
  # TODO: standardize route names
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
