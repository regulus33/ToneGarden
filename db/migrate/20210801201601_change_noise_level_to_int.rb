class ChangeNoiseLevelToInt < ActiveRecord::Migration[6.1]
  def change
    remove_column(:binaural_beats, :noiseLevel)
    add_column(:binaural_beats, :noiseLevel, :integer)
  end
end
