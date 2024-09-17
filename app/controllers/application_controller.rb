class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    include ActionController::Cookies

    # protect_from_forgery with: :exception
    # include SessionsHelper
    #     # Confirms a logged-in user.
    #     def logged_in_user
    #     unless logged_in?
    #         flash[:danger] = "Please log in."
    #         redirect_to login_url
    #     end
    #     end


    def current_user
      User.find_by(id: session[:current_user])
    end

    def authorize_user
      render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
    end

    def is_admin
      render json: { error: "Not Authorized" }, status: :unauthorized unless current_user.admin
    end

    private

    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    def render_not_found_response(invalid)
      render json: { errors: invalid }, status: :not_found
    end
end
