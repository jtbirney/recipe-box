# README

MenuBox is an app to search and store recipes. Built with the following:

Ruby v. 2.3.3
Rails v. 5.1.2
React v 16.0.0 (using webpacker)
React Router v. 3.0.2
PostgreSQL

## Getting Started
Run the following commands in terminal. (This app uses webpacker, which requires yarn. If you do not have yarn installed, run `$ brew install yarn`)
```
$ git clone git@github.com/jtbirney/recipe-box.git
$ bundle install
$ rake db:create
$ rake db:migrate
$ rails server
```
And in a separate tab
```
$ yarn install
$ yarn start
```

#### API key
For the recipe search function to work, you will need an API key from Edaman `https://developer.edamam.com/`
The API key can be stored in a .env file as follows
```
RECIPES_APP_ID=<YOUR_APP_ID_HERE>
RECIPES_API_KEY=<YOUR_API_KEY_HERE>
```

## Key Features
#### Recipe search
Recipe Search functions whether the user is logged in or not. The search query, including ingredient quantity and filters, is sent to the backend which reformats the query and sends it to the Edamam API and saves the search results to the database

#### Saving Recipes
Logged in users can save recipes to their collection of recipes or to their weekly menu. This is accomplished via customized many to many relationships on the model level such that user.menu recalls the recipes saved to the menu and user.recipes recalls all the user's saved recipes.

#### Adding a recipe from another website
Entering a url of a recipe from another website creates a new recipe and automatically calls the following methods defined on the recipe model
```
.get_title
.get_image
.get_ingredients
.get_directions
```
Each method utilizes the Nokogiri gem to parse the webpage. `.get_ingredients` & `.get_directions` find one of the ingredients or direction items and then call additional methods to recursively find all of the other ingredients or directions. These functions work on most major recipe websites, though may have issues on smaller/lesser known websites. Suggestions for improving these functions are always welcome.

## Test suite
Ruby testing using RSpec. Run with `$ rake`

React testing using Karma/Jasmine/Enzyme. Run with `$ karma start`
