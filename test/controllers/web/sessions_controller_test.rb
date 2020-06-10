# frozen_string_literal: true

require 'test_helper'

class Web::SessionsControllerTest < ActionController::TestCase
  setup do
    @password = generate(:password)
    @user = create(:user, { password: @password })
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    attrs = {
      email: @user.email,
      password: @password,
    }
    post :create, params: { session_form: attrs }
    assert_response :redirect

    assert signed_in?
    assert current_user == @user
  end

  test 'should delete destroy' do
    sign_in(@user)

    delete :destroy
    assert_response :redirect

    refute signed_in?
    assert current_user.nil?
  end
end
