class DocumentsController < ApplicationController
  def show
    doc = Document.find(params[:id])
    user_doc = UserDoc.find_by(user_id: current_user.id, document_id: doc.id)
    render json: [doc, user_doc]
  end

  def destroy
    if current_user.id == Document.find(params[:id]).creator_id
      Document.destroy(params[:id])
      render json: params[:id], :status => 202
    else
      render :nothing => true, :status => 406, :content_type => 'text/html'
    end
  end

  def index
    render json: Document.all
  end

  def new
    render json: Document.new
  end

  def create
    document = Document.new(document_params)
    document.creator_id = current_user.id
    document.creator_name = current_user.name
    document.save
    render json: document
  end

  def update
    document = Document.find(params[:id])
    current_user.documents << document
    render json: document
  end

private

  def document_params
      params.require(:document).permit(:title, :body, :author)
  end

end
