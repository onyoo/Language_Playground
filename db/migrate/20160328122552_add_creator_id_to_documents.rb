class AddCreatorIdToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :creator_id, :integer
  end
end
