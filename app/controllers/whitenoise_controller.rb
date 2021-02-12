# frozen_string_literal: true

class WhitenoiseController < ApplicationController
  skip_before_action :authorize
  layout "whitenoise"

  def index
    @whitenoise_props = { name: "Stranger" }
  end
end
