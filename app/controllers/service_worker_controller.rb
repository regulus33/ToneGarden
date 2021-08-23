class ServiceWorkerController < ApplicationController
  skip_before_action :authorize, only: %i[service_worker]
  protect_from_forgery except: :service_worker
  # https://www.pasilobus.com/blog/setting-up-service-worker-in-ruby-on-rails
  def service_worker; end
end
