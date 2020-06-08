# frozen_string_literal: true

require 'test_helper'

class Admin::UsersControllerTest < ActionController::TestCase
  setup do
    @admin = create(:admin)
    sign_in(@admin)
  end

  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get edit' do
    user = create(:user)

    get :edit, params: { id: user.id }
    assert_response :success
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user_attributes = attributes_for(:user)

    assert_difference -> { User.count }, 1 do
      post :create, params: { user: user_attributes }
      assert_response :redirect
    end

    created_user = User.find_by(email: user_attributes[:email])
    assert created_user.present?
    assert created_user[:first_name] == user_attributes[:first_name]
    assert created_user[:last_name] == user_attributes[:last_name]
    assert created_user[:type] == user_attributes[:type]
  end

  test 'should patch update' do
    user = create(:user)

    new_name = generate(:name)

    patch :update, params: { id: user.id, user: { first_name: new_name } }
    assert_response :redirect

    user.reload
    assert_equal(user.first_name, new_name)
  end

  test 'should delete destroy' do
    user = create(:user)

    assert_difference -> { User.count }, -1 do
      delete :destroy, params: { id: user.id }
      assert_response :redirect
    end

    refute User.exists?(user.id)
  end
end
