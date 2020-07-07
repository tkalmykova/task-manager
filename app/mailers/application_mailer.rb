# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  layout 'mailer'

  default from: 'noreply@taskmanager.com'
end
