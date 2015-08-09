class Api::MealsController < ApplicationController
  def index
    meals = Meal.from_user(current_user)
    meals = meals.from_date(params[:from]) if params[:from]
    meals = meals.to_date(params[:to]) if params[:from]

    render json: meals
  end
end
