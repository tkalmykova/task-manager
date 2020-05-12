# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description

    trait :with_author do
      author factory: :manager
    end

    trait :with_assignee do
      assignee factory: :developer
    end
  end
end
