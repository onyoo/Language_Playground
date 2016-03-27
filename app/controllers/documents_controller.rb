class DocumentsController < ApplicationController
  def show
    doc = Document.find(params[:id])
    render json: doc
  end

  def destroy
    if Document.destroy(params[:id])
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
    render json: Document.create(document_params)
  end

  def edit
    binding.pry
  end

  def update
    binding.pry
  end

private

  def document_params
      params.require(:document).permit(:title, :body)
  end

end
