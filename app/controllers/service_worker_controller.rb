class ServiceWorkerController < ApplicationController
  skip_before_action :authorize
  protect_from_forgery except: :service_worker

  # https://www.pasilobus.com/blog/setting-up-service-worker-in-ruby-on-rails
  def service_worker; end

  def manifest
    respond_to do |format|
      format.json { render json: PwaService.manifest.to_json }
    end
  end

  def assetlinks
    respond_to do |format|
      format.json { render json: PwaService.manifest.to_json }
    end
  end
end
