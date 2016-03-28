class SessionsController < ApplicationController

  def create
    @user = User.find_or_create_from_login(params, request.env['omniauth.auth'])
    if @user
      session[:user_id] = @user.id
      redirect_to posts_path, :notice => 'Logged in!'
    else
      redirect_to :back, notice: 'something went wrong... please try again?'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to posts_path
  end

end
