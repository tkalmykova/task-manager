# frozen_string_literal: true

require 'test_helper'

class Web::PasswordUpdatesControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    @user.generate_password_reset_token!
  end

  test 'should get show' do
    get :show, params: { token: @user.password_reset_token }
    assert_response :success
  end

  test 'should not get show if unknown token' do
    get :show, params: { token: 'fake' }
    assert_redirected_to new_session_path
  end

  test 'should not get show if token expired' do
    @user.password_reset_token_issued_at = 48.hours.ago
    @user.save

    get :show, params: { token: @user.password_reset_token }
    assert_redirected_to new_session_path
  end
end
