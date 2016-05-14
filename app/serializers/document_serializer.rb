class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :author, :created_at, :updated_at, :creator_id, :creator_name
end
