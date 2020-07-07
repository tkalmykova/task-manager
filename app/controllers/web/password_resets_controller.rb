# frozen_string_literal: true

class Web::PasswordResetsController < Web::ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def show
    render(react_component: 'PasswordResetForm', props: {})
  end
end
