class SeoController < ApplicationController
  skip_before_action :authorize

  def welcome; end
end
