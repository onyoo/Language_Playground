class DocumentsController < ApplicationController
  def show
    doc = Document.find(params[:id])
    render json: doc
  end

  def destroy
    binding.pry
  end

  def index
    render json: Document.all
  end

  def new
    render json: Document.new
  end

  def create
    render json: Document.create(document_params)
  end

private

  def document_params
      params.require(:document).permit(:title, :body)
  end

end
