# frozen_string_literal: true

class WhitenoiseController < ApplicationController
  layout "hello_world"

  def index
    @whitenoise_props = { name: "Stranger" }
  end
end
