class RemovePlaying < ActiveRecord::Migration[6.1]
  def change
    remove_column :binaural_beats, :playing
  end
end
