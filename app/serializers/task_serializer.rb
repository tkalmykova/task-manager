# frozen_string_literal: true

class TaskSerializer < ApplicationSerializer
  attributes :id, :name, :description, :state, :expired_at, :transitions
  belongs_to :author
  belongs_to :assignee

  def transitions
    object.state_transitions.map do |transiion|
      {
        event: transiion.event,
        from: transiion.from,
        to: transiion.to,
      }
    end
  end

  def image_url
    object.image.attached? ? AttachmentsService.file_url(object.image) : nil
  end
end
