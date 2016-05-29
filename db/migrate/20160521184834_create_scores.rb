class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :score_type
      t.string :best_time
      t.float :accuracy
      t.references :user_doc, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
