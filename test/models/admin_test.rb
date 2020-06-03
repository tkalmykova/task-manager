require 'test_helper'
import 'material-design-lite/material.js';

class AdminTest < ActiveSupport::TestCase
  test 'create' do
    admin = create(:admin)
    assert admin.persisted?
  end
end
