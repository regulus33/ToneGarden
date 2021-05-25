class ChangeLeftRight < ActiveRecord::Migration[6.1]
  def change
    rename_column :presets, :left, :carrier
    rename_column :presets, :right, :beat
  end
end