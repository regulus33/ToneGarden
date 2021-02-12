# frozen_string_literal: true
# Serves up the javascript required to run the SPA
class InitializersController < ApplicationController
  def index
    render 'application'
  end
end
