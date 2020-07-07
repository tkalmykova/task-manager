class Api::V1::PasswordUpdatesController < Api::V1::ApplicationController
  skip_before_action :authenticate_user!, only: [:update]

  def update
    password_update_form = PasswordUpdateForm.new(password_update_params)

    if password_update_form.valid?
      password_update_form.update_password
      head(:ok)
      return
    end

    respond_with(password_update_form)
  end

  private

  def password_update_params
    params.require(:password_update_form).permit(:token, :password, :password_confirmation)
  end
end
