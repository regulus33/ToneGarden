class DropPresets < ActiveRecord::Migration[6.1]
  def change
    drop_table(:presets)
  end
end
