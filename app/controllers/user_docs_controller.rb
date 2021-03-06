class UserDocsController < ApplicationController

  def create
    user_doc = UserDoc.new(user_doc_params)
    user_doc.user_id = current_user.id
    user_doc.save
    render json: user_doc, :status => 202
  end

  def update
    doc = Document.find(params[:id])
    user_doc = doc.update_score(current_user, score_params)
    score = user_doc.create_score(score_params)
    render json: score
  end

  def destroy
    relationship = UserDoc.where(document_id: params[:id], user_id: current_user.id)
    relationship.each(&:destroy)
    render nothing: true
  end

private

  def user_doc_params
    params.require(:user_doc).permit(:document_id)
  end

  def score_params
    params.require(:user_doc).permit(:accuracy, :best_time, :score_type)
  end
end
