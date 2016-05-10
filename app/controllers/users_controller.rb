class UsersController < ApplicationController

  def show
    u = User.find(current_user.id)
    render json: u.documents
  end

  def current
    render json: current_user, only: [:name, :id]
  end

end
