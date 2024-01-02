# Exposes correct attributes of User
class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email
end
