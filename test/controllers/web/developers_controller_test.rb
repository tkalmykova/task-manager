# frozen_string_literal: true

require 'test_helper'

class Web::DevelopersControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    sign_in(@user)
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    attrs = attributes_for(:developer)
    post :create, params: { developer: attrs }
    assert_response :redirect

    email = attrs[:email]
    developer = Developer.find_by(email: email)
    assert developer.present?

    assert signed_in?
    assert current_user == developer
  end
end
