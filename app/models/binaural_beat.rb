# frozen_string_literal: true

# Binaural beat data model
class BinauralBeat < ApplicationRecord
  def editable?
    editable.positive?
  end

  def copy_name
    return "#{name} (copy)" unless editable?

    logger.error(LoggerService.log_args('Called copy_name on editable beat!', { beat: self.inspect }))
  end
end