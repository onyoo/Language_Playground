class AddAccuracyAndTimeToUserDocs < ActiveRecord::Migration
  def change
    add_column :user_docs, :best_time, :interval
    add_column :user_docs, :accuracy, :float
  end
end
