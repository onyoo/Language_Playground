require 'rails_helper'

describe Document do
  before(:each) do
    @user = User.new(name: "Mr. Testy")
    @document = Document.new(id: 1, title: "My Awesome Doc", author: "The guy with the cat", body: "It was great.")
    @params = ActionController::Parameters.new({"accuracy"=>100, "best_time"=>"00:00:05", "score_type"=>"typing"})
  end

  describe "update_score for a new document" do
    it "should return a user_doc" do
      expect(@document.update_score(@user, @params)).to be_a(UserDoc)
    end

    it "should have a valid score, time, and type" do
      user_doc = @document.update_score(@user, @params)
      expect(user_doc.accuracy).to eq(100)
      expect(user_doc.best_time).to eq("00:00:05")
    end
  end

end
