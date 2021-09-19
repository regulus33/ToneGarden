# Exposes correct attributes of User
class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :use_white_noise, :use_audio_worklet
end
