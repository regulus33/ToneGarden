class AddSoundSourceToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :sound_source, :string
  end
end
