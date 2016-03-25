class CreateUserDocs < ActiveRecord::Migration
  def change
    create_table :user_docs do |t|
      t.references :user, index: true, foreign_key: true
      t.references :document, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
