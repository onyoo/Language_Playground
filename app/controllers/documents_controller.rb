class DocumentsController < ApplicationController
  def show
    render json: Document.find(params[:id])
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
