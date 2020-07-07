# frozen_string_literal: true

require 'test_helper'

class Api::V1::TasksControllerTest < ActionController::TestCase
  setup do
    @author = create(:user)
    @assignee = create(:user)
    @task = create(:task, author: @author)

    sign_in(@author)
  end

  test 'should get show' do
    get :show, params: { id: @task.id, format: :json }
    assert_response :success
  end

  test 'should get index' do
    get :index, params: { format: :json }
    assert_response :success
  end

  test 'should post create' do
    task_attributes = attributes_for(:task).
      merge({ assignee_id: @assignee.id })
    post :create, params: { task: task_attributes, format: :json }
    assert_response :created

    data = JSON.parse(response.body)
    created_task = Task.find(data['task']['id'])

    assert created_task.present?
    assert_equal task_attributes.stringify_keys, created_task.slice(*task_attributes.keys)
  end

  test 'should put update' do
    task_attributes = attributes_for(:task).
      merge({ author_id: @author.id, assignee_id: @assignee.id }).
      stringify_keys

    patch :update, params: { id: @task.id, format: :json, task: task_attributes }
    assert_response :success

    @task.reload
    assert_equal @task.slice(*task_attributes.keys), task_attributes
  end

  test 'should delete destroy' do
    delete :destroy, params: { id: @task.id, format: :json }
    assert_response :success

    refute Task.where(id: @task.id).exists?
  end
  test 'should put attach_image' do
    author = create(:user)
    task = create(:task, author: author)

    image = file_fixture('image.jpg')
    attachment_params = {
      image: fixture_file_upload(image, 'image/jpeg'),
      crop_x: 190,
      crop_y: 100,
      crop_width: 300,
      crop_height: 300,
    }

    put :attach_image, params: { id: task.id, attachment: attachment_params, format: :json }
    assert_response :success

    task.reload
    assert task.image.attached?
  end

  test 'should put remove_image' do
    author = create(:user)
    task = create(:task, author: author)

    image = file_fixture('image.jpg')
    attachable_image = fixture_file_upload(image)

    task.image.attach(attachable_image)

    put :remove_image, params: { id: task.id, format: :json }
    assert_response :success

    task.reload
    refute task.image.attached?
  end
end
