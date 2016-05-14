class UserDoc < ActiveRecord::Base
  belongs_to :user
  belongs_to :document

  def update_best_scores(score_params)
    if (self.accuracy < score_params[:accuracy] rescue false) && (self.best_time < score_params[:best_time] rescue false)
      self.update(score_params)
    else
      score_params.each do |key, val|
        if (self.send(key) < val rescue true)
          self.send(key + "=", val)
        end
      end
    end
  end

end
