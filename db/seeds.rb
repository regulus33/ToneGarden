# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

BinauralBeat.where(editable: false).delete_all

BinauralBeat.create(
  name: 'Deep Focus',
  beatOscillator:  238,
  carrierOscillator: -11,
  noiseLevel: -999,
  editable: false,
  volume: 0,
  description: 'Stimulating low alpha tones.'
)

BinauralBeat.create(
  name: 'Meditation',
  beatOscillator:  432,
  carrierOscillator: -7,
  noiseLevel: -999,
  editable: false,
  volume: 0,
  description: 'Theta waves at 432 hertz'
)

BinauralBeat.create(
  name: 'Peak alertness',
  beatOscillator:  209,
  carrierOscillator: 13,
  noiseLevel: -999,
  editable: false,
  volume: 0,
  description: 'Beta waves at a low, calming pitch'
)

BinauralBeat.create(
  name: 'Study source',
    beatOscillator: 555,
  carrierOscillator: -8,
  noiseLevel: -999,
  editable: false,
  volume: 0,
  description: 'Alpha waves for analytical thinking.'
)

BinauralBeat.create(
  name: 'Deep learning',
  beatOscillator: 100,
  carrierOscillator: -33.7,
  noiseLevel: -999,
  editable: false,
  description: 'Deep gamma waves',
  volume: 0
)

BinauralBeat.create(
  name: 'Illuminated',
  beatOscillator: 100,
  carrierOscillator: -33.7,
  noiseLevel: -999,
  editable: false,
  description: 'Beta tones for ideation',
  volume: 0
)

BinauralBeat.create(
  name: 'Super sleep',
  beatOscillator: 136,
  carrierOscillator: 6,
  noiseLevel: -999,
  editable: false,
  description: 'Theta relaxation',
  volume: 0,
)

BinauralBeat.create(
  name: 'Deep dream',
  beatOscillator: 57,
  carrierOscillator: -1,
  noiseLevel: -999,
  editable: false,
  description: 'Delta tones for dreaming',
  volume: 0,
)









