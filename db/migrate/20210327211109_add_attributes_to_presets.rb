class AddAttributesToPresets < ActiveRecord::Migration[6.1]
  def change
    add_column(:presets, :left, :float, default: 0)
    add_column(:presets, :right, :float, default: 0)

    add_reference(:presets, :user, index: true)
    add_foreign_key(:presets, :users)

  end
end
