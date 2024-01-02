class BinauralBeatsController < ApplicationController

  def index
    render json: { binauralBeatStates: fetch_binaural_beats }
  end

  def show
    render json: {
      binauralBeatState: fetch_only_allowed_beats(
        params[:beat_id]
      )
    }
  end

  private def fetch_only_allowed_beats(beat_id)
    beat = BinauralBeat.find(beat_id)

    return beat unless beat.user_id
    return nil if beat.user_id != logged_in_user.id

    beat
  end

  private def beat_params
    params.require(:preset).permit(
      :playing,
      :beatOscillator,
      :carrierOscillator,
      :volume,
      :noise_level,
      :editable,
      :name,
      :user_id
    )
  end

  private def fetch_binaural_beats
    BinauralBeat.where(user_id: nil)
  end
end
