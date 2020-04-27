FactoryBot.define do
  factory :task do
    name
    description { generate(:string) }

    trait :with_author do
      author { create(:user, :manager) }
    end

    trait :with_assignee do
      assignee { create(:user, :developer) }
    end
  end
end
