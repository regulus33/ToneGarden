class AddLevelNoiseLevelToPresets < ActiveRecord::Migration[6.1]
  def change
    add_column(:presets, :level, :float)
    add_column(:presets, :noise_level, :float)
  end
end
