# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# MUST BE 40hz from eachother and under 1500hz subtract small from large and you get brat frequency
Preset.create(name: 'Alertness', left: 700, right: 720, editable: false)
Preset.create(name: 'Dreaming', left: 800, right: 807, editable: false)
Preset.create(name: 'Peace', left: 766.15, right: 766.15 + 30, editable: false)
Preset.create(name: 'Sleep', left: 342.24, right: 342.24 + 3, editable: false)
Preset.create(name: 'Focus', left: 600.24, right: 600.24 + 12, editable: false)