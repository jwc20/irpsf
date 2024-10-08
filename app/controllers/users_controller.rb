class UsersController < ApplicationController
    # skip_before_action :authorize!, only: :index

    before_action :authorize!, only: [:show, :update]


    def index
      users = User.all
      render json: users
    end


    def create
      user = User.create(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end

    # def create
    #   user = User.create(user_params)
    #   if user.valid?
    #     render json: user, status: :created
    #   else
    #     render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end

    def show
      render json: @current_user
    end

    private

    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
