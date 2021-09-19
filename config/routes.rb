Rails.application.routes.draw do
  get '/better-oscillator.js', to: 'audio_worklet#better_oscillator'
  get '/service-worker.js', to: 'service_worker#service_worker'
  get '/offline.html', to:  'initializers#index' #serve the same old react application shell in offline mode

  # Actual classic mvc pages
  get '/welcome', to: 'seo#welcome'

  # React Router
  # NOTE: They should all match verbatim every React Router Route you have in play
  # initializers#index is the source of React and all front end code for this app,
  # if not downloaded yet, user will get the bundle otherwise React Rails finds the current js
  # Runtime/cached scripts and React Router will handle the behavior at this URI
  get '/', to: 'initializers#index'
  get '/signup', to: 'initializers#index'
  get '/signin', to: 'initializers#index'
  get '/presets', to: 'initializers#index'
  get '/preset_show/:preset_id', to: 'initializers#index'
  get '/create', to: 'initializers#index'
  get '/whoops', to: 'initializers#index'

  # API is namespaced bc react router can collide with some of our urls
  get '/api/binaural_beats', to: 'binaural_beats#index'
  get '/api/binaural_beats/:beat_id', to: 'binaural_beats#show'
  post '/api/binaural_beats', to: 'binaural_beats#create'
  put '/api/binaural_beats/:beat_id', to: 'binaural_beats#update'
  delete '/api/binaural_beats/:beat_id', to: 'binaural_beats#delete'

  resources :users, only: :create do
    collection do
      post 'login'
      get 'guest'
    end
  end
  put 'users', to: 'users#update'
  get 'users', to: 'users#show'
  # TODO: standardize route names
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
