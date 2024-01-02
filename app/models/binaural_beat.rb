# frozen_string_literal: true

# Binaural beat data model
class BinauralBeat < ApplicationRecord

  validate :noiseLevelJavascriptNumber

  def editable?
    editable.positive?
  end

  def copy_name
    return "#{name} (copy)" unless editable?

    logger.error(LoggerService.log_args('Called copy_name on editable beat!', { beat: self.inspect }))
  end

  def noiseLevelJavascriptNumber
    return if noiseLevel == '-Infinity'

    unless noiseLevel.match(/^\d*\.?\d*$/)
      errors.add('Bad data given to noiseLevel')
    end
  end
end