class ChangeNoiseLevelToString < ActiveRecord::Migration[6.1]
  def change
    change_column :binaural_beats, :noiseLevel, :string
  end
end
