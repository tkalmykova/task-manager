# frozen_string_literal: true

class PasswordUpdateForm
  include ActiveModel::Model

  attr_accessor(
    :token,
    :password,
    :password_confirmation,
  )

  validates :token, presence: true
  validates :password, presence: true, confirmation: true
  validate :token_valid?

  def user
    return unless token.present?

    User.find_by(password_reset_token: token)
  end

  def update_password
    user.reset_password!(password)
  end

  private

  def token_valid?
    if user.nil?
      errors.add(:token, 'token is invalid')
      return
    end
    errors.add(:token, 'token has expired') if user.password_token_expired?
  end
end
