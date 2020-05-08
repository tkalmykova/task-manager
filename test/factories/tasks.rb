# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description

    trait :with_author do
      author { create(:manager) }
    end

    trait :with_assignee do
      assignee { create(:developer) }
    end
  end
end
