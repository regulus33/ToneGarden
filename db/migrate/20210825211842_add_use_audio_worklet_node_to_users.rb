class AddUseAudioWorkletNodeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :use_audio_worklet, :boolean
  end
end
