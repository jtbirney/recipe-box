class Api::V1::UserRecipesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def update
    note = UserRecipe.find(params[:id])
    note.note = note_params[:note]
    note.save
    render json: note
  end

  private
  def note_params
    params.require(:user_recipe).permit(:note)
  end
end
