class AuthenticationController < ApplicationController
  def login
    username = params[:username]
    password = params[:password]

    if username == 'admin' && password == 'admin'
      render json: {
        token: generate_token,
        message: 'Login successful'
      }, status: :ok
    else
      render json: {
        error: 'Invalid credentials'
      }, status: :unauthorized
    end
  end

  private

  def generate_token
    # Simple Base64 token (username:timestamp)
    # In production, use JWT or similar
    payload = { username: 'admin', timestamp: Time.current.to_i }
    Base64.encode64(payload.to_json).strip
  end
end

