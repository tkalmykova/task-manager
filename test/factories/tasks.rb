FactoryBot.define do
  factory :task do
    name { generate(:string) }
    description { generate(:string) }

    trait :with_author do
      author { create(:user, :manager) }
    end

    trait :assignee do
      assignee { create(:user, :developer) }
    end
  end
end
