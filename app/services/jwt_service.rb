class JwtService
  # TODO: from env var
  FAKE_SECRET = 'FAKE_SECRET'.freeze

  def self.encode_token(payload)
    JWT.encode(payload, FAKE_SECRET)
  end

  def self.decoded_token(token)
    JWT.decode(token, FAKE_SECRET, true, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end
end
