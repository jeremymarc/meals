class Api::UsersController < Api::BaseController
  before_action :doorkeeper_authorize!, except: [:create]

  def show
    render json: current_user
  end

  def create
    user = User.new(create_safe_params)
    user.role = User.roles[:user]
    if user.save
      render json: user, status: 201
    else
      render json: { errors: user.errors.full_messages }, status: 400
    end
  end

  def update
    user = User.find(current_user.id)
    user.update_attributes(safe_params)

    render json: user, status: 200
  end

  private

  def safe_params
    params.require(:user).permit(:daily_calorie)
  end

  def create_safe_params
    params.require(:user).permit(:email, :password)
  end
end
