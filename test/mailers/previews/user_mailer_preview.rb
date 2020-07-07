class UserMailerPreview < ActionMailer::Preview
  def task_created
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_created
  end

  def task_destroyed
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_destroyed
  end

  def task_updated
    user = User.first
    task = Task.first
    params = { user: user, task: task }

    UserMailer.with(params).task_updated
  end

  def password_reset
    user = User.first
    user.generate_password_reset_token!
    params = { user: user }

    UserMailer.with(params).password_reset
  end
end
