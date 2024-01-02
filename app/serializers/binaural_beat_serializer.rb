# Exposes correct attributes of User
class BinauralBeatSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id, :playing, :beatOscillator, :carrierOscillator, :volume, :noiseLevel
  attribute :editable do |num|
    num == 1
  end
end
