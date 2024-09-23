class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authorize

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # def is_admin
    #   render json: { error: "Not Authorized" }, status: :unauthorized unless current_user.admin
    # end

    def current_user
        # Sets and returns an instance from the session ID
        @current_user ||= User.find_by(id: session[:user_id])
    end

    private

    def authorize
      @current_user = User.find_by(id: session[:user_id])
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end

    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    # def render_not_found_response(invalid)
    #   render json: { errors: invalid }, status: :not_found
    # end
end

