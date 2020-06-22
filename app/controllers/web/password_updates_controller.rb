# frozen_string_literal: true

class Web::PasswordUpdatesController < Web::ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def show
    render(react_component: 'PasswordUpdateForm', props: {})
  end
end
