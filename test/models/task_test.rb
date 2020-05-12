require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    task = create(:task, :with_author)
    assert task.persisted?
  end
end
