class RenameNoiseLevel < ActiveRecord::Migration[6.1]
  def change
    rename_column(:binaural_beats, :noise_level, :noiseLevel)
  end
end
