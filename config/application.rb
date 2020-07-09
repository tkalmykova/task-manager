# frozen_string_literal: true

require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    config.load_defaults 6.0
    config.assets.paths << Rails.root.join('node_modules')
    config.active_job.queue_adapter = :sidekiq

    routes.default_url_options = { host: ENV['APP_HOST'] }
    config.action_mailer.default_url_options = { host: ENV['APP_HOST'] }
  end
end
