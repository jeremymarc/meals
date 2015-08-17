class Api::BaseController < ActionController::Base
  before_action :doorkeeper_authorize!

  private
  def current_resource_owner
    p doorkeeper_token.inspect
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end
  alias_method :current_user, :current_resource_owner

  def permission_denied
    render json: {error: 'unauthorized'}, status: :unauthorized
  end

  def not_found
    render json: {error: 'Not Found'}, status: 404
  end

  def conflict
    render json: {error: 'conflict'}, status: 409
  end
end
