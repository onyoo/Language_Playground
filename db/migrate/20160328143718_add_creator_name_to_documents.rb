class AddCreatorNameToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :creator_name, :string
  end
end
