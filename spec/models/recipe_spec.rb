require 'rails_helper'

RSpec.describe Recipe, vcr: true, type: :model do
  describe '.get_title' do
    it 'gets the title from the recipe url' do
      VCR.use_cassette("title", record: :new_episodes) do
        recipe = Recipe.new(url: "http://www.finecooking.com/recipe/chicken-pot-pie")

        expect(recipe.get_title).to eq "Chicken Pot Pie - FineCooking"
      end
    end

    describe '.get_image' do
      it "gets the image from the recipe url" do
        VCR.use_cassette("image", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.finecooking.com/recipe/chicken-pot-pie")

          expect(recipe.get_image).to eq "http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18151930/051013028-01-ChickenPotPie-thumb1x1.jpg"
        end
      end
    end

    describe ".get_ingredients" do
      it "gets the list of ingredients from the recipe url from Fine Cooking" do
        VCR.use_cassette("fine_cooking_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.finecooking.com/recipe/chicken-pot-pie")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "One 3-lb. chicken",
            "3 Tbs. olive oil",
            "Salt and freshly ground black pepper",
            "2 cups 1/2-inch potato chunks (1 to 2 medium peeled potatoes; I prefer Yukon gold)",
            "24 pearl onions, peeled and left whole",
            "2 cups 1/2-inch carrot chunks (2 to 3 medium carrots, peeled)",
            "1 clove garlic, peeled and minced",
            "8 mushrooms, halved or quartered",
            "2 Tbs. chopped assorted fresh herbs (parsley, rosemary, thyme); more to taste",
            "1 cup peas (fresh or frozen and defrosted)",
            "4 cups chicken stock (homemade or low-salt canned)",
            "6 Tbs. butter (as needed)",
            "6 Tbs. flour",
            "1 recipe Rough Puff Pastry for Chicken Pot Pie, refrigerated",
            "1 egg yolk, beaten",
            "1/2 cup cream"
          ]
        end
      end

      it "gets the list of ingredients from the recipe url from Food Network" do
        VCR.use_cassette("food_network_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.foodnetwork.com/recipes/rachael-ray/hummus-pit-zas-recipe-1945831")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "6 (6-inch) pitas",
            "1/2 pint container store bought plain hummus",
            "1/2 cup prepared olive tapenade",
            "3 cups shredded provolone or mozzarella or a combination of the 2",
            "6 anchovies, chopped, optional",
            "3 whole roasted red peppers, drained, chopped",
            "1 can artichoke hearts in water, 6 hearts, drained well and chopped",
            "1/2 cup sliced pepperoncini, chopped, optional",
            "Handful of flat-leaf parsley, chopped"
          ]
        end
      end

      it "gets the list of ingredients from the recipe url from All Recipes" do
        VCR.use_cassette("all_recipes_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "http://allrecipes.com/recipe/219077/chef-johns-perfect-mashed-potatoes/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%203")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "3 large russet potatoes, peeled and cut in half lengthwise",
            "1/4 cup butter",
            "1/2 cup whole milk",
            "salt and ground black pepper to taste",
            "Add all ingredients to list"
          ]
        end
      end

      it "gets the list of ingredients from the recipe url from Martha Stewart" do
        VCR.use_cassette("marthastewart_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "https://www.marthastewart.com/337868/vegetable-pad-thai")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "8 ounces dried, wide, and flat rice noodles",
            "2 tablespoons dark-brown sugar",
            "2 tablespoons fresh lime juice, plus wedges for serving",
            "3 tablespoons soy sauce",
            "2 teaspoons vegetable oil",
            "3 scallions, white and green parts separated and thinly sliced",
            "1 garlic clove, minced",
            "2 large eggs (optional), lightly beaten",
            "1/2 cup fresh cilantro",
            "1/4 cup chopped roasted, salted peanuts"
          ]
        end
      end

      it "gets the list of ingredients from the recipe url from the Kitchn" do
        VCR.use_cassette("kitchn_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.thekitchn.com/how-to-make-a-bacon-wrapped-turkey-237557")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "For the bacon butter:",
            "8 tablespoons unsalted butter",
            "4 ounces thick-cut bacon (about 4 slices), coarsely chopped",
            "1 tablespoon dried thyme",
            "1 teaspoon dried rubbed sage",
            "For the turkey:",
            "1 (12- to 15-pound) turkey, thawed if frozen",
            "1 medium onion, peeled and quartered",
            "1 1/2 pounds thick-cut bacon (about 22 slices)"
          ]
        end
      end

      it "gets the list of ingredients from the recipe url from Epicurious" do
        VCR.use_cassette("Epicurious_ingredients", record: :new_episodes) do
          recipe = Recipe.new(url: "https://www.epicurious.com/recipes/food/views/retro-strawberries-and-cream-pretzel-tart-51194410")

          expect(recipe.get_ingredients).to be_a_kind_of Array
          expect(recipe.get_ingredients).to eq [
            "4 cups/140 g store-bought tiny pretzel twists",
            "1/2 cup plus 3 tbsp/155 g unsalted butter, melted",
            "1/2 cup/50 g firmly packed light brown sugar"
          ]
        end
      end
    end

    describe ".get_directions" do
      it "gets the list of directions from the recipe url from Fine Cooking" do
        VCR.use_cassette("fine_cooking_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.finecooking.com/recipe/chicken-pot-pie")

          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq [
            "Heat the oven to 375°F. Rub the chicken with 1 Tbs. of the olive oil and sprinkle generously, inside and out, with salt and pepper.",
            "Toss the potatoes, onions, carrots, garlic, and mushrooms with the remaining 2 Tbs. olive oil and the chopped herbs.",
            "Set the chicken upside down in a large flameproof roasting pan and scatter the vegetables around the chicken. Roast for 1 hour and 15 minutes, stirring the vegetables several times.",
            "Remove the chicken from the pan to cool. Remove the vegetables with a slotted spoon and reserve them in a bowl, with the peas. Don’t rinse out the roasting pan.",
            "Pour the fat and juices into a measuring cup or gravy separator. Spoon or pour the fat away from the juice; reserve the fat. Add the juices to the chicken stock. Measure out the fat and add enough butter (if needed) to make 6 Tbs.",
            "Put the roasting pan (which should still have the caramelized bits from the chicken and vegetables) on the stove over medium heat. Pour in the 6 Tbs. of fat and butter mixture; when it’s melted and bubbling, add the flour and stir constantly to make a smooth roux. Scrape up any caramelized remains from the chicken and vegetables. Cook the roux, stirring constantly, until lightly browned, about 5 minutes. Add the chicken stock, bring to a boil, and simmer. Continue to stir and scrape the bottom of the pan. Cook the sauce for at least 15 minutes, whisking occasionally, until it’s as thick as heavy cream. Season with salt, pepper, and more herbs to taste.",
            "When the chicken has cooled, pull the meat from the bones, discarding the skin and bones. Cut the meat into small (1/2- to 1-inch ) chunks and set aside.",
            "Position a rack in the  middle of the oven and heat the oven to 400°F. Choose six 12-oz. ovenproof bowls or one 2-qt. casserole.",
            "Remove the dough from the refrigerator. Lay it on a floured board and roll it out 1/8 inch thick into a 20×16-inch rectangle. Set the dishes (or dish) for the pot pie upside down on the dough and cut around the rims with a knife or pastry cutter. (If you like extra pastry, cut the pastry a little larger than the top of the dishes.) Stack the pastry pieces on a plate, separating each with waxed paper or plastic wrap. Refrigerate until ready to use.",
            "Divide the chicken, vegetables, and sauce among the dishes. Lay the pastry on top, pressing along the edge of the dish to seal.",
            "Blend the egg yolk and cream. Brush the mixture onto the pastry with a pastry brush.",
            "Put the pies on a baking sheet to catch any drips. Bake on the center rack in the 400°F oven for 50 to 55 minutes, or until the crust is thoroughly browned and puffed. Steam will escape along the edges of the pastry."
          ]
        end
      end

      xit "gets the list of directions from the recipe url from Food Network" do
        VCR.use_cassette("food_network_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.foodnetwork.com/recipes/rachael-ray/hummus-pit-zas-recipe-1945831")
          directions = [
            "Preheat oven to 400 degrees F. ",
            "Arrange the pitas on baking sheets or sheets. In a bowl combine the hummus and the olive tapanade. Spread the hummus on pitas and top with cheese, like pizza. Combine the chopped anchovies, peppers, artichokes, and pepperoncini. Cover the pizzas with the chopped mixture. Bake 10 to 12 minutes to melt cheese and crisp the pitas. Cut pizzas into wedges and garnish with parsley."
          ]
          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq directions
        end
      end

      it "gets the list of directions from the recipe url from All Recipes" do
        VCR.use_cassette("all_recipes_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "http://allrecipes.com/recipe/219077/chef-johns-perfect-mashed-potatoes/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%203")

          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq [
            "Place the potatoes into a large pot, and cover with salted water. Bring to a boil, reduce heat to medium-low, cover, and simmer until tender, 20 to 25 minutes. Drain, and return the potatoes to the pot. Turn heat to high, and allow the potatoes to dry for about 30 seconds. Turn off the heat.",
            "Mash the potatoes with a potato masher twice around the pot, then add the butter and milk. Continue to mash until smooth and fluffy. Whisk in the salt and black pepper until evenly distributed, about 15 seconds."
          ]
        end
      end

      it "gets the list of directions from the recipe url from Martha Stewart" do
        VCR.use_cassette("marthastewart_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "https://www.marthastewart.com/337868/vegetable-pad-thai")

          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq [
            "Soak noodles according to package instructions. Drain. In a small bowl, whisk together brown sugar, lime juice, and soy sauce.",
            "In a large nonstick skillet, heat oil over medium-high. Add scallion whites and garlic and cook, stirring constantly, until fragrant, 30 seconds. Add eggs (if using) and cook, scraping skillet with a rubber spatula, until eggs are almost set, about 30 seconds. Transfer egg mixture to a plate. Add noodles and soy-sauce mixture to skillet; cook, tossing constantly, until noodles are soft and coated with sauce, about 1 minute. Add egg mixture and toss to coat, breaking eggs up gently. Serve noodles with lime wedges, topped with scallion greens, cilantro, and peanuts."
          ]
        end
      end

      xit "gets the list of directions from the recipe url from the Kitchn" do
        VCR.use_cassette("kitchn_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "http://www.thekitchn.com/how-to-make-a-bacon-wrapped-turkey-237557")

          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq [
            "Thaw the turkey. If your turkey is frozen, thaw it in the refrigerator. For a 12- to 15-pound turkey, this will take about 3 days, estimating 5 hours of thaw time for each pound of turkey.",
            "Make the bacon butter. Place all the ingredients in a food processor fitted with the blade attachment and pulse until smooth. This can be done up to 3 days in advance and stored in the refrigerator, but bring the butter back to room temperature before rubbing down the turkey.",
            "Prepare the turkey and rub with the bacon butter. Remove the giblets and neck from the turkey's cavity. Save the neck for making stock and the giblets for making gravy. Set the turkey breast-side up on a roasting rack set inside a roasting pan. Liberally rub the turkey inside and out with the bacon butter. Put the onion pieces in the cavity of the turkey. Tie the turkey's legs together with a piece of kitchen twine, if desired.",
            "Wrap the legs and wings with bacon. Wrap each leg with 2 slices of bacon. Wrap each wing with 1 slice of bacon, tucking the ends underneath the bird or in the crease between the leg and the breast.",
            "Weave the bacon blanket. Lay 8 slices of bacon side by side on a piece of parchment or waxed paper. Make sure the slices are as close together as possible. Working from the bottom up, weave another 8 slices of bacon into the first layer. Again, make sure these slices are as close together as possible.",
            "Blanket the turkey breast. Place the woven bacon onto the turkey breasts: Set the piece of paper next to the roasting pan and line the bacon blanket up at an angle to create a diamond. Carefully flip the paper over the turkey breast. Don't worry about aligning it perfectly — you will still be able to move the blanket a little once you get it into place. Remove the parchment and tuck the blanket in and around the breast and into the leg crease. Trim any excessive overhanging bacon with scissors, if desired.",
            "Bring the bird to room temperature. You can make the bird from start to finish in 1 day or refrigerate the bacon-wrapped bird overnight. Either way, the bird should sit at room temperature for 2 hours before roasting.",
            "Roast the bird. Arrange a rack in the bottom third of the oven, remove any racks above it, and heat to 425°F. Pour 2 cups of water into the roasting pan underneath the turkey. This will create steam in the oven and prevent the bacon from rapidly shrinking and falling off the bird. Roast the turkey for 30 minutes to darken and crisp the skin.",
            "Reduce the oven temperature and roast until it reaches 165°F. Reduce the oven temperature to 325°F. Roast for an additional 2 to 2 1/2 hours. The rule of thumb for cooking a turkey is 13 minutes per pound, but more important than time is the temperature of the turkey. Use a probe thermometer to test the turkey in 3 places: the breast, the outer thigh, and between the thigh and breast. The turkey should reach 165°F in all 3 places.",
            "Rest for 30 minutes and then carve: Carefully remove the turkey and the roasting rack to a cutting board or rimmed baking sheet. Rest the turkey for at least 30 minutes before carving. Use the drippings to make gravy, if desired. Just as you would carve a chicken or plain turkey, start by removing the turkey's legs before carving the breasts. To keep the bacon intact, cut through the bacon first and then carve the breast beneath. Serve the turkey with any of the bacon crumbles that may fall off the bird as you carve.",
            "Make ahead: You can wrap the turkey in bacon up to 2 days in advance and store tightly wrapped in the refrigerator. Bring the turkey closer to room temperature by removing it from the refrigerator 2 hours before roasting.",
            "Storage: Leftovers can be stored in an airtight container at room temperature for up to 4 days."
          ]
        end
      end

      it "gets the list of directions from the recipe url from Epicurious" do
        VCR.use_cassette("Epicurious_directions", record: :new_episodes) do
          recipe = Recipe.new(url: "https://www.epicurious.com/recipes/food/views/retro-strawberries-and-cream-pretzel-tart-51194410")

          expect(recipe.get_directions).to be_a_kind_of Array
          expect(recipe.get_directions).to eq [
            "Preheat the oven to 350°F/180°C/gas 4.",
            "Put the pretzels into a resealable plastic bag and crush them with a rolling pin into pieces that are no larger than 1/4 in/6 mm. (Or pulse the pretzels in a food processor, if you prefer.) Pour the crushed pretzels and their crumbs into a medium bowl and stir in the butter and brown sugar. Press the crust mixture into the bottom of a 9-in/23-cm springform pan, covering the bottom of the pan evenly. Bake the crust until it is lightly toasted, 10 to 12 minutes. It will be soft and puffy when you first remove it from the oven, but will harden as it cools. Set the crust aside to cool completely.",
            "Put the bowl of a stand mixer and the whip attachment in the freezer for 10 minutes.",
            "Attach the bowl and the whisk attachment to the mixer, and pour in the cream. Begin whipping the cream on medium speed. When it starts to thicken, pour in 2 tbsp of the granulated sugar and the vanilla. Whip the cream mixture on medium speed until soft peaks form. (When you dip a spoon into the whipped cream and pull it out, the cream should form a peak that curls back onto itself.) Set aside 1 1/2 cups/360 ml of the whipped cream in a small bowl. Transfer the remaining whipped cream to a separate bowl, cover, and refrigerate; you will use it to top the tart later.",
            "Put the remaining 1/2 cup/100 g of granulated sugar and the cream cheese in the bowl of the stand mixer. Using the paddle attachment, beat the sugar and cream cheese together on medium speed until creamy, about 2 minutes. Remove the bowl from the mixer, and stir the reserved 1 1/2 cups of whipped cream into the cream cheese mixture until it is homogenous. Spread the cream cheese filling evenly over the cooled crust. Be sure to completely cover the crust, spreading the filling to the edges of the pan. Use a damp paper towel to wipe down any specks of filling clinging to the sides of the pan or the edges of the tart will appear messy when the springform is removed. Refrigerate until chilled and set, 30 minutes.",
            "Meanwhile, bring 1/2 cup/120 ml of the water to a boil over high heat. Put the gelatin powder in a medium heat-proof bowl and pour in the boiling water. Stir until the gelatin is completely dissolved. Stir in the remaining 1/4 cup/60 ml of cold water. Allow the gelatin to cool to room temperature.",
            "While the gelatin cools, arrange the strawberries, cut-side down, over the cream cheese filling to cover the entire top of the tart. Start by lining the edge of the tart with a ring of strawberries and work your way to the center in a target pattern. The tips of the berries should be pointing straight up. Pour the gelatin over the strawberries and cream cheese layer, coating the tops of the strawberries in the gelatin as you pour. Refrigerate, covered, until the gelatin is completely set, at least 1 hour. (The tart can be refrigerated up to 1 day before serving.)",
            "Remove the sides of the pan and transfer the tart (still on the springform base) to a serving platter. Gently rewhisk the reserved whipped cream for 10 to 15 seconds and pile it in the center of the tart, if you wish or pass at the table. Slice and serve immediately."
          ]
        end
      end
    end
  end
end
