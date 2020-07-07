# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, format: { with: /\A.*@.*\z/ }, uniqueness: true
  validates :password_reset_token, uniqueness: true, allow_nil: true

  def generate_password_reset_token!
    self.password_reset_token = SecureRandom.urlsafe_base64
    self.password_reset_token_issued_at = Time.current
    save
  end

  def password_token_expired?
    (password_reset_token_issued_at + 24.hours) < Time.current
  end

  def reset_password!(password)
    self.password_reset_token = nil
    self.password_reset_token_issued_at = nil
    self.password = password
    save
  end
end
