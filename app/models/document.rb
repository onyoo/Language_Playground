class Document < ActiveRecord::Base
  has_many :user_docs, dependent: :destroy
  has_many :users, through: :user_docs
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'


end
