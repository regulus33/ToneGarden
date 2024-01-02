class AddDescriptionToBeats < ActiveRecord::Migration[6.1]
  def change
    add_column(:binaural_beats, :description, :string, default: 'user preset')
  end
end
