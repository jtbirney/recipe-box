import React, { Component } from 'react'
import RecipeTileContainer from './RecipeTileContainer'

class MenuShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: 0,
      recipes: []
    }
    this.updateRecipes = this.updateRecipes.bind(this)
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
  }

  updateRecipes(updatedRecipe, method) {
    let newRecipes
    if (method === "removeMenu" || method === "removeRecipes") {
      newRecipes = this.state.recipes.filter(recipe => {
        return recipe.id !== updatedRecipe.id
      })
    }
    this.setState({ recipes: newRecipes })
  }

  fetchCurrentUser() {
    fetch(`/api/v1/users`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        if (response.name) {
          this.setState({
            username: response.name,
            userId: response.id
          })
        } else {
          this.setState({
            username: "",
            userId: 0
          })
        }
      })
  }

  componentDidMount() {
    this.fetchCurrentUser()
    fetch(`/api/v1/menu_items`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        this.setState({ recipes: response })
      })
  }

  render() {
    return(
      <div className="grid-container">
        <div className="grid-x">
          <div className="callout small-12 cell text-center">
            <h1>My Menu</h1>
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

export default MenuShowContainer
