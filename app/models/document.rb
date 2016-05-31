class Document < ActiveRecord::Base
  has_many :user_docs, dependent: :destroy
  has_many :users, through: :user_docs
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'

  def update_score(user, score_params)
    if !user_doc = user.user_docs.detect{|user_d| user_d.document_id == self.id}
      user_doc = user.user_docs.build(score_params.permit(:best_time, :accuracy).merge(document_id: self.id))
    else
      user_doc.update_best_scores(score_params)
    end
    user_doc
  end

end
