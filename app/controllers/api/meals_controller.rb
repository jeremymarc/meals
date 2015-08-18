class Api::MealsController < Api::BaseController
  def index
    meals = Meal.all

    meals = meals.from_user(current_user) if (current_user.user?)
    meals = meals.from_date(params[:from]) if params[:from]
    meals = meals.to_date(params[:to]) if params[:to]

    render json: meals
  end

  def create
    meal = Meal.create(safe_params)
    meal.user = current_user
    meal.save

    render json: meal
  end

  def show
    meal = Meal.from_user(current_user).find(params[:id]) || not_found

    render json: meal
  end

  def update
    meal = Meal.from_user(current_user).find(params[:id]) || not_found
    meal.update_attributes(safe_params)

    render json: meal
  end

  def destroy
    meal = Meal.from_user(current_user).find(params[:id]) || not_found
    meal.destroy

    render nothing: true
  end

  private

  def safe_params
    params.require(:meal).permit(:description, :calories, :eaten_at)
  end
end
