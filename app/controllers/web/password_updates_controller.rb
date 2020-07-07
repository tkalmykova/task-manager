# frozen_string_literal: true

class Web::PasswordUpdatesController < Web::ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def show
    user = User.find_by(password_reset_token: params[:token])
    if user.nil? || user.password_token_expired?
      redirect_to(new_session_path)
      return
    end

    render(react_component: 'PasswordUpdateForm', props: {})
  end
end
