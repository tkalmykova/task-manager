# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'active_model_serializers'
gem 'bcrypt', '~> 3.1.7'
gem 'jbuilder', '~> 2.7'
gem 'kaminari'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3'
gem 'rails', '~> 6.0.2', '>= 6.0.2.2'
gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'responders'
gem 'sass-rails', '>= 6'
gem 'simple_form'
gem 'slim-rails'
gem 'state_machines'
gem 'state_machines-activerecord'
gem 'webpacker', '~> 4.0'
gem 'webpacker-react'
gem 'js-routes'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'rollbar'
gem 'newrelic_rpm'
gem 'sidekiq'
gem 'sidekiq-failures'
gem 'sidekiq-throttled'
gem 'sidekiq-unique-jobs', '~> 6.0.13'
gem 'mini_magick'
gem 'virtus'
gem 'file_validators'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails'
  gem 'rubocop'
  gem 'bullet'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
  gem 'letter_opener'
  gem 'letter_opener_web'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'coveralls', require: false
  gem 'simplecov', require: false
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
