class AddThemeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :add_theme_to_users, :string
  end
end
