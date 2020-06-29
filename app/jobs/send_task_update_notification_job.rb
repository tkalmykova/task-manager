class SendTaskCreateNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer

  def perform(task_id)
    task = Task.find(params[:id])
    if task.update(task_params)

      UserMailer.with(user: current_user, task: task).task_updated.deliver_now
  end
end
