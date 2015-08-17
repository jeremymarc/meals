require "test_helper"

class DoorkeeperControllerTest < ActionController::TestCase
  def setup
    @controller = Doorkeeper::TokensController.new
  end

  test "should get a valid oauth token" do
    user = users(:jeremy)
    post :create, { username: user.email, password: default_password, grant_type: "password" }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal(json['token_type'], "bearer")
  end
end
