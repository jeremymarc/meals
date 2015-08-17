require "test_helper"

class Api::UsersControllerTest < ActionController::TestCase
  def setup
    @user = users(:jeremy)
    @token = StubToken.new(@user.id)
    @controller.instance_variable_set("@_doorkeeper_token", @token)
  end

  test "show" do
    get :show, id: @user.id
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal(@user.daily_calorie, json['daily_calorie'])
    assert_equal(@user.email, json['email'])
    assert_equal(@user.daily_calorie, json['daily_calorie'])
    assert_equal(@user.role, json['role'])
  end

  test "create" do
    email = "newemail@domain.com"
    password = "password"
    post :create, user: { email: email, password: password }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal(json['email'], email)
    assert_equal(json['role'], 'user')
    assert_equal(json['daily_calorie'], nil)
  end

  test "should respond with valid json" do
    put :update, user: { daily_calorie: 1000 }
    assert_response :success
    json = JSON.parse(response.body)
  end

  test "update changed saved values" do
    put :update, user: { daily_calorie: 1000 }
    original_json = @user.attributes.to_json
    database_json = User.find(@user.id).to_json
    assert_response(:success, response.body)

    get :show
    response_json = response.body

    assert_equal(database_json, response_json)
    refute_equal(original_json, response_json)
  end
end
