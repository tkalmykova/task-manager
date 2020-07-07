# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  root to: 'web/boards#show'

  scope module: :web do
    resource :board, only: :show
    resource :session, only: %i[new create destroy]
    resources :developers, only: %i[new create]
  end

  namespace :admin do
    resources :users
  end

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :tasks, only: %i[index show create update destroy]
      resources :users, only: [:index, :show]
    end
  end
end

