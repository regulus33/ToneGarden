class AddNameToPresets < ActiveRecord::Migration[6.1]
  def change
    add_column(:presets, :name, :string)
  end
end
