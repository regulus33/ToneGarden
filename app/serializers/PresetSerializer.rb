# Exposes correct attributes of User
class PresetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :left, :right, :name, :id
end
