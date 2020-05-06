# frozen_string_literal: true

require 'test_helper'

class Web::BoardsControllerTest < ActionDispatch::IntegrationTest
  before_action :authenticate_user!

  test 'should get show' do
    get board_url
    assert_response :success
  end

  setup do
    user = create(:user)
    sign_in user
  end
end
