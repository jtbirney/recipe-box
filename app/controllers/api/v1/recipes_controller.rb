module Api
  module V1
    class RecipesController < ApplicationController
      def index
        # CODE TO GET RECIPES FROM EDEMAN API
        response = HTTParty.get('https://api.edamam.com/search?q=chicken+breast')
        hits = response.parsed_response["hits"]
        recipes = []

        hits.each do |hit|
          url = hit["recipe"]["url"]
          title = hit["recipe"]["label"]
          image = hit["recipe"]["image"]
          recipes.push({ url: url, title: title, image: image })
        end
        #
        render json: { recipes: recipes }

        # page = Nokogiri::HTML(open('http://www.thekitchn.com/recipe-pepperoni-pizza-baked-pasta-249774'))
        # # get title using Nokogiri
        # title = page.title
        #
        # body = page.css("#recipe")
        # recipe = ""
        # body.traverse do |node|
        #   if node.text
        #     recipe += node.text
        #   end
        # end
        # this works, but gets more text than I want...

        # doc = Pismo::Document.new("http://allrecipes.com/recipe/23431/to-die-for-fettuccine-alfredo/?internalSource=popular&referringContentType=home%20page&clickId=cardslot%203")
        # recipe = doc.body
        # render json: { recipes: recipe }
      end
    end
  end
end


# https://api.edamam.com/search?q=chicken+soup&app_id=0e3a1bd0&app_key=f9d81b784c2a254bdc1e05504881f36f
