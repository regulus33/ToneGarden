class BinauralBeatsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: { binauralBeatStates: fetch_binaural_beats }
  end

  def show
    render json: {
      binauralBeatState: fetch_only_allowed_beat(
        params[:beat_id]
      )
    }
  end

  def update
    beat = BinauralBeat.find(params[:id])
    saved = beat.update(beat_args)

    logger.info(LoggerService.log_args('User saved beat', {user: logged_in_user.id, beat: beat.inspect})) if saved
    logger.error(LoggerService.log_args('User could not saved beat', {user: logged_in_user.id, beat: beat.inspect})) unless saved
    render json: BinauralBeatSerializer.new(beat)
  end

  def create
    beat = BinauralBeat.new(beat_args)
    beat.editable = true
    saved = beat.save

    logger.info(LoggerService.log_args('User saved beat', {user: logged_in_user.id, beat: beat.inspect})) if saved
    logger.error(LoggerService.log_args('User could not saved beat', {user: logged_in_user.id, beat: beat.inspect})) unless saved
    render json: BinauralBeatSerializer.new(beat)
  end


  private def fetch_only_allowed_beat(beat_id)
    beat = BinauralBeat.find(beat_id)

    return BinauralBeatSerializer.new(beat) unless beat.user_id
    return nil if beat.user_id != logged_in_user.id

    beat
  end

  private def beat_args
    {
      user_id: logged_in_user.id,
      noiseLevel: beat_params[:noiseLevel],
      volume: beat_params[:volume],
      editable: true,
      name: beat_params[:name],
      carrierOscillator: beat_params[:carrierOscillator],
      beatOscillator: beat_params[:beatOscillator]
    }
  end

  private def beat_params
    params.permit(
      :playing,
      :beatOscillator,
      :carrierOscillator,
      :volume,
      :noiseLevel,
      :editable,
      :name,
      :user_id
    )
  end

  private def fetch_binaural_beats
    BinauralBeat.where(
      user_id: nil
    ).or(
      BinauralBeat.where(
        user_id: logged_in_user.id
      )
    )
  end
end
