require "test_helper"

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "should login with valid credentials" do
    post login_path, params: {
      username: "admin",
      password: "admin"
    }, as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response["token"].present?
    assert_equal "Login successful", json_response["message"]
  end

  test "should not login with invalid username" do
    post login_path, params: {
      username: "invalid",
      password: "admin"
    }, as: :json

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal "Invalid credentials", json_response["error"]
  end

  test "should not login with invalid password" do
    post login_path, params: {
      username: "admin",
      password: "invalid"
    }, as: :json

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal "Invalid credentials", json_response["error"]
  end

  test "should generate valid token" do
    post login_path, params: {
      username: "admin",
      password: "admin"
    }, as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    token = json_response["token"]

    # Verify token can be decoded
    decoded = Base64.decode64(token)
    payload = JSON.parse(decoded)
    assert_equal "admin", payload["username"]
    assert payload["timestamp"].present?
  end
end

