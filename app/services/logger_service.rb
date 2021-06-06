# frozen_string_literal: true
class LoggerService
  def self.log_args(message, body)
    { message: message, body: body }.to_s
  end
end