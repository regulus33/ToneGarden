class CreateBinauralBeats < ActiveRecord::Migration[6.1]
  def change
    create_table :binaural_beats do |t|
      t.boolean :playing
      t.float :beatOscillator
      t.float :carrierOscillator
      t.float :volume
      t.float :noise_level
      t.float :editable
      t.string :name
      t.references :user, index: true

      t.timestamps
    end
  end
end
