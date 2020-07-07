# frozen_string_literal: true

require 'simplecov'
require 'coveralls'

SimpleCov.start
Coveralls.wear!('rails')

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include AuthHelper
  include ActionMailer::TestHelper

  parallelize(workers: :number_of_processors)
  fixtures :all
end
