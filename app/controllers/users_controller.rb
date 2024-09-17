class UsersController < ApplicationController
    before_action :authorized, except: [ :create ]
    # skip_before_action :require_login, only: [:create]

    # def create
    #   user = User.create!(user_params)
    #   render json: user, status: :created
    # end


    def create
      user = User.create(user_params)
      if user.valid?
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end



    def index
      # for testing
      render json: User.all
    end

    def show
      debugger
      current_user = User.find_by(id: session[:user_id])
      render json: current_user
    end

    # def show
    #   user = User.find_by(id: session[:user_id])
    #   if user
    #     render json: user
    #   else
    #     render json: { error: "Not authorized" }, status: :unauthorized
    #   end
    # end

    def update
      user = User.find(params[:id])
      user.update!(user_params)
      render json: user, status: :created
    end

    def destroy
      user = User.find(params[:id])
      user.destroy
      head :no_content
    end

    private


    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
