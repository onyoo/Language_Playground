class UsersController < ApplicationController

  def show
    u = User.find(current_user.id)
    render json: u.documents
  end

end
