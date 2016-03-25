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

  def create
    binding.pry
  end

end
