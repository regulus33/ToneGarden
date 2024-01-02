class AddUseWhiteNoiseToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :use_white_noise, :boolean
  end
end
