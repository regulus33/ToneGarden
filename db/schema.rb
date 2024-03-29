# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_10_004904) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "binaural_beats", force: :cascade do |t|
    t.float "beatOscillator"
    t.float "carrierOscillator"
    t.float "volume"
    t.float "editable"
    t.string "name"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description", default: "user preset"
    t.integer "noiseLevel"
    t.index ["user_id"], name: "index_binaural_beats_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "anonymous_id"
    t.boolean "use_audio_worklet"
    t.boolean "use_white_noise"
    t.string "theme"
  end

end
