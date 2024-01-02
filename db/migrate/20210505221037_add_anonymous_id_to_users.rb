class AddAnonymousIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column(:users, :anonymous_id, :string)
  end
end
