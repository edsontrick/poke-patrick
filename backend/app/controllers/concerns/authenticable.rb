module Authenticable
  extend ActiveSupport::Concern

  private

  def authenticate_request
    token = request.headers['Authorization']&.split(' ')&.last
    
    unless token && valid_token?(token)
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return false
    end
    true
  end

  def valid_token?(token)
    begin
      decoded = Base64.decode64(token)
      payload = JSON.parse(decoded)
      payload['username'] == 'admin' && payload['timestamp'].present?
    rescue JSON::ParserError, ArgumentError
      false
    end
  end
end

