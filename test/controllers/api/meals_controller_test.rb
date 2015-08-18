require "test_helper"

class Api::MealsControllerTest < ActionController::TestCase
  def setup
    @user = users(:jeremy)
    @token = StubToken.new(@user.id)
    @controller.instance_variable_set("@_doorkeeper_token", @token)
  end

  test "should respond with valid json" do
    get :index
    assert_response :success
    JSON.parse(response.body)
  end

  test "should list current user meals" do
    meals = Meal.from_user(@user)
    get :index
    assert_response :success

    data = JSON.parse(response.body)
    assert_equal(meals.size, data.size)
  end

  test "should create a meal and assign to current user" do
    description = "new meal description"
    calories = 900
    eaten_at = DateTime.now.utc.to_s

    assert_difference("Meal.count", 1, "A Meal should be created") do
      post :create, meal: { calories: calories, description: description, eaten_at: eaten_at }
      assert_response :success

      meal = Meal.from_user(@user).last
      assert_equal(meal.description, description)
      assert_equal(meal.calories, calories)
      assert_equal(meal.eaten_at.utc, eaten_at)
    end
  end

  test "should update an existing meal" do
    meal = meals(:burger)
    description = "Half Burger"
    calories = 1200
    eaten_at = DateTime.now.utc.to_s
    put :update, id: meal.id, meal: {calories: calories, description: description, eaten_at: eaten_at}
    assert_response :success

    meal = Meal.from_user(@user).find(meal.id)
    assert_equal(meal.description, description)
    assert_equal(meal.calories, calories)
    assert_equal(meal.eaten_at.utc, eaten_at)
  end

  test "should destroy an existing meal" do
    meal = meals(:burger)

    assert_difference("Meal.count", -1, "A Meal should be deleted") do
      delete :destroy, id: meal.id
      assert_response :success
    end
  end
end
