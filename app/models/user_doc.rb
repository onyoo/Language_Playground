class UserDoc < ActiveRecord::Base
  belongs_to :user
  belongs_to :document
  has_many :scores

  validates :user_id, uniqueness: {scope: :document_id}

  def update_best_scores(score_params)
    if score_params[:accuracy] >= 60
      if (self.accuracy < score_params[:accuracy] rescue true) && (self.best_time < score_params[:best_time] rescue true)
        self.update(score_params)
      else
        score_params.each do |key, val|
          # uses case because lower time is better, but higher score is better
          # will allow for adding more cases if more metrics are added
          case key
          when 'best_time'
            self.set_lower_score(key, val)
          else
            self.set_higher_score(key, val)
          end
        end
        self.changed? ? self.save : nil
      end
    end

  end

  def set_lower_score(key, val)
    if (self.send(key) > val rescue true)
      self.send(key + "=", val)
    end
  end

  def set_higher_score(key, val)
    if (self.send(key) < val rescue true)
      self.send(key + "=", val)
    end
  end

end
