class UserDocSerializer < ActiveModel::Serializer
  attributes :id, :document_id, :user_id, :best_time, :accuracy
  has_many :scores
end
