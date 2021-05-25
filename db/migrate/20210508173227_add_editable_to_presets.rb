class AddEditableToPresets < ActiveRecord::Migration[6.1]
  def change
    add_column(:presets, :editable, :boolean)
  end
end
