# frozen_string_literal: true

require 'test_helper'
import 'material-design-lite/material.js';

class Web::BoardsControllerTest < ActionController::TestCase
  setup do
    user = create(:user)
    sign_in user
  end

  test 'should get show' do
    get :show
    assert_response :success
  end
end
