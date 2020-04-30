# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name
    last_name
    email
    password

    factory :admin do
      type { 'Admin' }
    end

    factory :manager do
      type { 'Manager' }
    end

    factory :developer do
      type { 'Developer' }
    end
  end
end
