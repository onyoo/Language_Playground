# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160529065546) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "documents", force: :cascade do |t|
    t.string   "title"
    t.string   "body"
    t.string   "author"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "creator_id"
    t.string   "creator_name"
  end

  create_table "scores", force: :cascade do |t|
    t.string   "score_type"
    t.string   "best_time"
    t.float    "accuracy"
    t.integer  "user_doc_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "scores", ["user_doc_id"], name: "index_scores_on_user_doc_id", using: :btree

  create_table "user_docs", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "document_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "best_time"
    t.float    "accuracy"
  end

  add_index "user_docs", ["document_id"], name: "index_user_docs_on_document_id", using: :btree
  add_index "user_docs", ["user_id"], name: "index_user_docs_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "provider"
    t.string   "uid"
    t.string   "url"
    t.string   "location"
    t.string   "image_url"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.string   "profile_pic_url"
  end

  add_foreign_key "scores", "user_docs"
  add_foreign_key "user_docs", "documents"
  add_foreign_key "user_docs", "users"
end
