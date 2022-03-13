# FOR DEVELOPMENT ONLY
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource 'users',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
