# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# MUST BE 40hz from eachother and under 1500hz subtract small from large and you get brat frequency

def nameee
  result = ''
  result << %w[Energy Ultra Sleep Pain Focus Flow].sample
  result
end

25.times do
  beat = rand(40...1500)
  carrier = rand(-40...40)
  BinauralBeat.create(
    name: nameee,
    beatOscillator: beat,
    carrierOscillator: carrier,
    volume: 0,
    noiseLevel: 0,
    editable: [true, false].sample,
  )
end