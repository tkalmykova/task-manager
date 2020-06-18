# frozen_string_literal: true

require 'test_helper'

class Api::V1::UsersControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    sign_in(@user)
  end

  test 'should get show' do
    get :show, params: { id: @user.id, format: :json }
    assert_response :success
  end

  test 'should get index' do
    get :index, params: { format: :json }
    assert_response :success
  end
end
