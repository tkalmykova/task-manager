FactoryBot.define do
    sequence :email do |n|
      "email#{n}@factory.com"
    end

    sequence :string do |n|
      "string#{n}"
    end

    sequence :password do |n|
      "str0ng_pass#{n}"
    end
  end
