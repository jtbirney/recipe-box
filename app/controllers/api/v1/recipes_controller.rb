class Api::V1::RecipesController < ApplicationController
  def index
    # CODE TO GET RECIPES FROM EDEMAN API
    # response = HTTParty.get("https://api.edamam.com/search?q=chicken+pot+pie&app_id=#{ENV["RECIPES_APP_ID"]}&app_key=#{ENV["RECIPES_API_KEY"]}&to=10")
    # hits = response.parsed_response["hits"]
    # recipes = []
    #
    # hits.each do |hit|
    #   url = hit["recipe"]["url"]
    #   title = hit["recipe"]["label"]
    #   image = hit["recipe"]["image"]
    #   recipes.push({ url: url, title: title, image: image })
    # end


    # Test data to avoid making repeated API calls
    response = {
      "hits": [
        {
          "recipe": {
            "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_121b40b4af5f8f9c3dbc0272cc1a70a5",
            "label": "Chicken Breast With Salsa",
            "image": "https://www.edamam.com/web-img/b4e/b4ecf425e5fcd21390a1203976f5fef8.jpg",
            "source": "Epicurious",
            "url": "http://www.epicurious.com/recipes/food/views/Chicken-Breast-with-Salsa-242444"
          }
        },
        {
          "recipe": {
            "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_a95b1340fb3d2945287a4b31daf1c94f",
            "label": "Grilled stuffed chicken breast",
            "image": "https://www.edamam.com/web-img/ac9/ac9d4c23885c77b2747a798ff756b862.jpg",
            "source": "La Cucina Italiana",
            "url": "http://lacucinaitalianamagazine.com/recipe/grilled_stuffed_chicken_breast_"
          }
        },
        {
          "recipe": {
            "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_7b401f7932461d2c200de073b27f293c",
            "label": "Chicken Breast with Fresh Sage",
            "image": "https://www.edamam.com/web-img/80b/80b93a7122b7146dea2af3212a4f64a9.JPG",
            "source": "Food52",
            "url": "https://food52.com/recipes/2451-chicken-breast-with-fresh-sage"
          }
        }
      ]
    }
    hits = response[:hits]
    recipes = []

    hits.each do |hit|
      url = hit[:recipe][:url]
      title = hit[:recipe][:label]
      image = hit[:recipe][:image]
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

  def show
    if current_user.id == params[:id].to_i
      render json: { recipes: current_user.recipes}
    else
      render json: { error: "Hmm... We can't find your recipes. Have you logged in?" }
    end
  end

  def create
  end
end
