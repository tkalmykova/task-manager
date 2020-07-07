class UserMailer < ApplicationMailer
  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New Task Created')
  end

  def task_destroyed
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task Destroyed')
  end

  def task_updated
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task Updated')
  end

  def password_reset
    @user = params[:user]

    mail(to: @user.email, subject: 'Reset your TaskManager password')
  end
end
