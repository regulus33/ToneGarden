class RemoveAddThemeFromUsersFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :add_theme_to_users
  end
end
