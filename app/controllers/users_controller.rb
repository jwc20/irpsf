# class UsersController < ApplicationController
#     def new
#       @user = User.new
#     end
  
#     def create
#       @user = User.new(user_params)
#       if @user.save
#         log_in @user
#         redirect_to messages_url
#       else
#         render 'new'
#       end
#     end
  
#     private
  
#       def user_params
#         params.require(:user).permit(:username, :password, :password_confirmation)
#       end
#   end


class UsersController < ApplicationController
    # before_action :authorize_user, except: [:create]
  
    def create
      user = User.create!(user_params)
      render json: user, status: :created
    end
  
    def index
      # for testing
      render json: User.all
    end
  
    def show
      current_user = User.find_by(id: session[:current_user])
      render json: current_user
    end
  
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
    params.require(:user).permit(:username, :password, :password_confirmation)
    end
  end