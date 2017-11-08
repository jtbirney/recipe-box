import React, { Component } from 'react'
import RecipeTile from '../components/RecipeTile'

class RecipeTileContainer extends Component {
  constructor(props) {
    super(props)

    this.addToMenu = this.addToMenu.bind(this)
    this.addToRecipes = this.addToRecipes.bind(this)
    this.deleteFromMenu = this.deleteFromMenu.bind(this)
    this.deleteFromRecipes = this.deleteFromRecipes.bind(this)
  }

  addToMenu(recipe) {
    let formPayloadJSON = JSON.stringify({recipe: { id: recipe.id}})
    fetch('/api/v1/menu_items', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
        console.log(response.recipe)
        this.props.updateRecipes(response.recipe, "addMenu")
      })
  }

  addToRecipes(recipe) {
      let formPayloadJSON = JSON.stringify(recipe)
      fetch('/api/v1/recipes', {
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: formPayloadJSON
      }).then(response => response.json())
        .then(response => {
          this.props.updateRecipes(response.recipe, "addRecipes")
        })
  }

  deleteFromRecipes(recipe) {
    fetch(`/api/v1/recipes/${recipe.id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(response => response.json())
    .then(response => {
      this.props.updateRecipes(response.recipe, "removeRecipes")
    })
  }

  deleteFromMenu(recipe) {
    fetch(`/api/v1/menu_items/${recipe.id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(response => response.json())
      .then(response => {
        this.props.updateRecipes(response.recipe, "removeMenu")
      })
  }

  render() {
    let recipes
    if (this.props.recipes) {
      recipes = this.props.recipes.map(recipe => {
        let handleAddRecipes = () => this.addToRecipes(recipe)
        let handleAddMenu = () => this.addToMenu(recipe)
        let handleDeleteRecipes = () => this.deleteFromRecipes(recipe)
        let handleDeleteMenu = () => this.deleteFromMenu(recipe)
        return(
          <RecipeTile
            key={recipe.url}
            recipe={recipe}
            user={this.props.userId}
            recipesIcon="fa-minus"
            recipestext=" Recipes"
            menuIcon="fa-minus"
            menuText=" Menu"
            handleAddMenu={handleAddMenu}
            handleAddRecipes={handleAddRecipes}
            handleDeleteMenu={handleDeleteMenu}
            handleDeleteRecipes={handleDeleteRecipes}
          />
        )
      })
    }

    return(
      <div className="grid-x grid-margin-x">
        {recipes}
      </div>
    )
  }
}

export default RecipeTileContainer
