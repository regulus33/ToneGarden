class AudioWorkletController < ApplicationController
  skip_before_action :authorize, only: %i[better_oscillator]
  protect_from_forgery except: :better_oscillator

  def better_oscillator; end
end
