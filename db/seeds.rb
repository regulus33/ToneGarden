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
  letters = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)
  rand(3...7).times do
    result << letters.sample
  end
  result
end

25.times do
  beat = rand(20...20000)
  carrier = rand(-40...40)
  BinauralBeat.create(
    name: nameee,
    playing: [true, false].sample,
    beatOscillator: beat,
    carrierOscillator: carrier,
    volume: 0,
    noiseLevel: 0,
    editable: [true, false].sample,
  )
end