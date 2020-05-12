# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end

  sequence :string, aliases: [:first_name, :last_name, :name, :description] do |n|
    "string#{n}"
  end

  sequence :password do |n|
    "str0ng_pass#{n}"
  end
end
