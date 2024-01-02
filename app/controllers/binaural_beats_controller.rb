# frozen_string_literal: true

# Simple crud controller
class BinauralBeatsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :limit_user_beats, only: :create

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
    beat = fetch_only_allowed_beat(params[:beat_id], as_active_record: true)
    return render nil, status: :forbidden unless beat

    # creates a new beat if user was trying to edit a preset
    saved = if beat.editable?
              beat.update(beat_args)
            else
              new_beat = BinauralBeat.new(beat_args)
              new_beat.name = beat.copy_name if beat.name == new_beat.name
              beat = new_beat
              new_beat.save
            end

    logger.info(LoggerService.log_args('User saved beat', { user: logged_in_user.id, beat: beat.inspect })) if saved
    unless saved
      logger.error(LoggerService.log_args('User could not save beat',
                                          { user: logged_in_user.id, beat: beat.inspect }))
    end

    render json: { binauralBeatState: BinauralBeatSerializer.new(beat) }
  end

  def create
    beat = BinauralBeat.new(beat_args)
    beat.editable = true
    saved = beat.save

    logger.info(LoggerService.log_args('User saved beat', { user: logged_in_user.id, beat: beat.inspect })) if saved
    unless saved
      logger.error(LoggerService.log_args('User could not saved beat',
                                          { user: logged_in_user.id, beat: beat.inspect }))
    end
    render json: { binauralBeatState: BinauralBeatSerializer.new(beat) }
  end

  def delete
    beat = fetch_only_allowed_beat(params[:beat_id], as_active_record: true)
    return render nil, status: :forbidden unless beat
    return render nil, status: :forbidden unless beat.user_id

    beat.destroy
    render json: {}, status: :ok
  end

  private

  # Make sure users can't see each other's beats
  def fetch_only_allowed_beat(beat_id, as_active_record: false)
    beat = BinauralBeat.find(beat_id)

    return nil if beat.user_id && beat.user_id != logged_in_user.id

    return beat if as_active_record

    BinauralBeatSerializer.new(beat)
  end

  def beat_args
    {
      user_id: logged_in_user.id,
      noiseLevel: beat_params[:noiseLevel],
      volume: beat_params[:volume],
      editable: true,
      name: beat_params[:name],
      carrierOscillator: beat_params[:carrierOscillator],
      beatOscillator: beat_params[:beatOscillator]
    }.tap do |h|
      if params[:action] == 'create'
        h[:description] = beat_params[:description]
      end
    end
  end

  def beat_params
    params.permit(
      :beatOscillator,
      :carrierOscillator,
      :volume,
      :noiseLevel,
      :editable,
      :name,
      :user_id,
      :description
    )
  end

  def fetch_binaural_beats
    BinauralBeat.where(
      user_id: nil,
      editable: false
    ).or(
      BinauralBeat.where(
        user_id: logged_in_user.id
      )
    )
  end

  def limit_user_beats
    if logged_in_user.binaural_beats.count > 100
      render json: { errors: ['You cannot have more than 100 beats. Try deleting some first.'] }, status: :insufficient_storage
    end
  end
end
