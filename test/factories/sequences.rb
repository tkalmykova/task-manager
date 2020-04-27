FactoryBot.define do
    sequence :email do |n|
      "email#{n}@factory.com"
    end

    sequence :string, aliases: [:first_name, :last_name, :name] do |n|
      "string#{n}"
    end

    sequence :password do |n|
      "str0ng_pass#{n}"
    end
  end
