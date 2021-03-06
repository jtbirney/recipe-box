import React, { Component } from 'react'
import RecipeTileContainer from './RecipeTileContainer'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: "",
      recipes: [],
      userId: parseInt(this.props.params.id)
    }
    this.updateRecipes = this.updateRecipes.bind(this)
  }

  updateRecipes(updatedRecipe, method) {
    let newRecipes = this.state.recipes
    let index
    newRecipes.forEach(recipe => {
      if (recipe.id === updatedRecipe.id) {
        index = newRecipes.indexOf(recipe)
      }
    })
    if (method === "addMenu" || method === "removeMenu") {
      newRecipes[index].menu = !newRecipes[index].menu
    } else if (method === "removeRecipes") {
      newRecipes = this.state.recipes.filter(recipe => {
        return recipe.id !== updatedRecipe.id
      })
    }
    this.setState({ recipes: newRecipes })
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.state.userId}/recipes`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(body => {
        this.setState({
          error: body.error,
          recipes: body
        })
      })
      .catch(error => {
        this.setState({ error: "We can't find your page. Have you logged in?"})
      })
    }

  render() {
    return(
      <div className="grid-container">
        <div className="grid-x">
          <div className="callout small-12 cell text-center">
            <h1>My Recipes</h1>
          </div>
        </div>
        <RecipeTileContainer
          userId={this.state.userId}
          recipes={this.state.recipes}
          updateRecipes={this.updateRecipes}
        />
      </div>
    )
  }
}

export default UserShowContainer
