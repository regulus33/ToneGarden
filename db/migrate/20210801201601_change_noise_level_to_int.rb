class ChangeNoiseLevelToInt < ActiveRecord::Migration[6.1]
  def change
    change_column(:binaural_beats, :noiseLevel, 'integer USING CAST(noiseLevel AS integer)')
  end
end
