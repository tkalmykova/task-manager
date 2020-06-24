class Api::V1::PasswordResetsController < Api::V1::ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def create
    user = User.find_by(email: params[:email])
    if user.nil?
      head(:created)
      return
    end

    user.generate_password_reset_token!

    UserMailer.with(user: user).password_reset.deliver_now

    head(:created)
  end
end
