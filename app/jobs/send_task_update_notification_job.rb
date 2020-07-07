class SendTaskCreateNotificationJob < ApplicationJob
  sidekiq_options queue: :mailers
  sidekiq_throttle_as :mailer
  sidekiq_options lock: :until_and_while_executing, on_conflict: { client: :log, server: :reject }

  def perform(_task_id)
    task = Task.find(params[:id])
    if task.update(task_params)

      UserMailer.with(user: current_user, task: task).task_updated.deliver_now
    end
  end
end
