# frozen_string_literal: true

class Admin::UsersController < Admin::ApplicationController
  def show
    @user = User.find(params[:id])
  end
end
