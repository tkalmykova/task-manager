# frozen_string_literal: true

require 'test_helper'

class Api::V1::PasswordResetsControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
  end

  test 'should post create' do
    assert_emails 1 do
      post :create, params: { email: @user.email }, format: :json
      assert_response :created
    end

    @user.reload
    assert @user.password_reset_token.present?
    assert @user.password_reset_token_issued_at.present?
  end

  test 'should post create for unknown user' do
    assert_emails 0 do
      post :create, params: { email: 'fake@email.com' }, format: :json
      assert_response :created
    end

    @user.reload
    refute @user.password_reset_token.present?
    refute @user.password_reset_token_issued_at.present?
  end
end
