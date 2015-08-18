require "test_helper"
require "digest/md5"

class UserTest < ActiveSupport::TestCase
  test "should create a User without error" do
    user = users(:jeremy)
    assert user.save!
  end

  test "should not create a user without an email" do
    user = users(:jeremy)
    user.email = nil
    refute user.save
  end

  test "should get profile_image from gravatar" do
    user = users(:jeremy)
    email = user.email
    avatar = "http://www.gravatar.com/avatar/" + Digest::MD5.hexdigest(email) + "fs=50"
    assert_equal user.profile_image, avatar
  end
end
