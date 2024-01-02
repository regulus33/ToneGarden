class CreatePresets < ActiveRecord::Migration[6.1]
  def change
    create_table :presets do |t|

      t.timestamps
    end
  end
end
