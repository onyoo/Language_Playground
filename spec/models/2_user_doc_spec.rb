require "rails_helper"

describe UserDoc do

  before :each do
    @user_doc = UserDoc.new(best_time: "00:00:15", accuracy: 90.0)
  end

  describe "#set_lower_score" do
    it "should set key if attribute is lower" do
      @user_doc.set_lower_score("best_time", "00:00:10")
      expect(@user_doc.best_time).to eq("00:00:10")
    end
  end

  describe "#set_higher_score" do
    it "should set key if attribute is higher" do
      @user_doc.set_higher_score("accuracy", 100)
      expect(@user_doc.accuracy).to eq(100)
    end
  end


  describe "#update_best_scores" do
    it "should update both accuracy and time" do
      @user_doc.update_best_scores(ActionController::Parameters.new({"accuracy"=>100, "best_time"=>"00:00:05", "score_type"=>"typing"}))

      expect(@user_doc.accuracy).to eq(100)
      expect(@user_doc.best_time).to eq("00:00:05")
    end

    it "should not update best_time if accuracy is under than 60%" do
      @user_doc.update_best_scores(ActionController::Parameters.new({"accuracy"=>55, "best_time"=>"00:00:02", "score_type"=>"typing"}))
      expect(@user_doc.best_time).to eq("00:00:15")

      @user_doc.update_best_scores(ActionController::Parameters.new({"accuracy"=>60, "best_time"=>"00:00:02", "score_type"=>"typing"}))
      expect(@user_doc.best_time).to eq("00:00:02")
    end

  end
end
