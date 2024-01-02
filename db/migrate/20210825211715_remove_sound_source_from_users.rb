class RemoveSoundSourceFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :sound_source
  end
end
