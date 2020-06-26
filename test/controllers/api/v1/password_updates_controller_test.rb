# frozen_string_literal: true

require 'test_helper'

class Api::V1::PasswordUpdatesControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    @user.generate_password_reset_token!
    @password_update_form = {
      token: @user.password_reset_token,
      password: 'secure_pass1',
      password_confirmation: 'secure_pass1',
    }
  end

  test 'should put update' do
    put :update, params: { password_update_form: @password_update_form }, format: :json
    assert_response :success

    @user.reload
    assert @user.authenticate(@password_update_form[:password])
    assert @user.password_reset_token.nil?
    assert @user.password_reset_token_issued_at.nil?
  end

  test 'should not put update if unknown token' do
    @password_update_form[:token] = 'fake'

    put :update, params: { password_update_form: @password_update_form }, format: :json
    assert_equal response.status, 422

    @user.reload
    refute @user.authenticate(@password_update_form[:password])
    refute @user.password_reset_token.nil?
    refute @user.password_reset_token_issued_at.nil?
  end

  test 'should not put update if token expired' do
    @user.password_reset_token_issued_at = 48.hours.ago
    @user.save

    put :update, params: { password_update_form: @password_update_form }, format: :json
    assert_equal response.status, 422

    @user.reload
    refute @user.authenticate(@password_update_form[:password])
    refute @user.password_reset_token.nil?
    refute @user.password_reset_token_issued_at.nil?
  end

  test 'should not put update if password does not match confirmation' do
    @password_update_form[:password_confirmation] = 'secure_pass_wrong'

    put :update, params: { password_update_form: @password_update_form }, format: :json
    assert_equal response.status, 422

    @user.reload
    refute @user.authenticate(@password_update_form[:password])
    refute @user.password_reset_token.nil?
    refute @user.password_reset_token_issued_at.nil?
  end
end
