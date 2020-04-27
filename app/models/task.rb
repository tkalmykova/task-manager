class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    state :new_task
    state :in_qa
    state :in_development
    state :in_code_review
    state :archived
    state :ready_for_release
    state :released

    event :put_in_development do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :put_in_qa do
      transition in_development: :in_qa
    end

    event :put_in_code_review do
      transition in_qa: :in_code_review
    end

    event :put_in_ready_for_release do
      transition in_code_review: :ready_for_release
    end

    event :put_in_released do
      transition ready_for_release: :released
    end

    event :put_in_archived do
      transition [:new_task, :released] => :archived
    end
  end
end
