class HomeController < ApplicationController
  protect_from_forgery with: :exception
  ensure_security_headers
  before_action :authenticate_user!

  def index
  end
end
