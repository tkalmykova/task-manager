class SendTaskCreateNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer

  def perform(_task_id)
    task = Task.find(params[:id])
    if task.destroy
      UserMailer.with(user: current_user, task: task).task_destroyed.deliver_now
    end
  end
end
