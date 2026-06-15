class CommentsController < ApplicationController
    before_action :set_comment, only: [:update, :destroy]

    # GET /comments
    def index
        @comments = Comment.newest_first
        render json: @comments
    end

    # POST /comments
    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: @comment, status: :created, location: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /comments/:id
    def update
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # DELETE /comments/:id
    def destroy
        @comment.destroy
        head :no_content
    end

    private

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def comment_params
        params.require(:comment).permit(:author, :text, :date, :likes)
    end
end