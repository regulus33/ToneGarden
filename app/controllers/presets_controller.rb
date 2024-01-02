class PresetsController < ApplicationController

  def index
    render json: { presets: fetch_presets }
  end

  def show
    render json: {
      preset: fetch_only_allowed_preset(
        params[:preset_id]
      )
    }
  end

  private def fetch_only_allowed_preset(preset_id)
    preset = Preset.find(preset_id)

    return preset unless preset.user_id
    return nil if preset.user_id != logged_in_user.id

    preset
  end

  private def preset_params
    params.require(:preset).permit(:id, :name, :left, :right, :user_id)
  end

  private def fetch_presets
    Preset.where(user_id: nil)
  end
end
