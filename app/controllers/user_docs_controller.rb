class UserDocsController < ApplicationController

  def create
    @user_doc = UserDoc.new(user_doc_params)
    @user_doc.user_id = current_user.id
    @user_doc.save
    render json: @user_doc, :status => 202
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
end
