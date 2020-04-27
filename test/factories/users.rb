FactoryBot.define do
  factory :user do
    first_name
    last_name
    email
    password
    type { 'User' }

    trait :admin do
      type { 'Admin' }
    end

    trait :manager do
      type { 'Manager' }
    end

    trait :developer do
      type { 'Developer' }
    end
  end
end
