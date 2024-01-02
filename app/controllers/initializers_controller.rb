# frozen_string_literal: true
# Serves up the javascript required to run the SPA
class InitializersController < ApplicationController
  skip_before_action :authorize
  def index
    render 'application'
  end
end
