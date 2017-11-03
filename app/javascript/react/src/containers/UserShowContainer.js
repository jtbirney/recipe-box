import React, { Component } from 'react'
import RecipeTile from '../components/RecipeTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: "",
      recipes: [],
      userId: parseInt(this.props.params.id)
    }
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  deleteRecipe(recipe) {
    fetch(`/api/v1/recipes/${recipe.id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(response => response.json())
      .then(response => {
        let remainingRecipes = this.state.recipes.filter(recipe => {
          return recipe.id !== response.recipe.id
        })
        this.setState({ recipes: remainingRecipes })
      })
  }

  componentDidMount() {
    fetch(`/api/v1/recipes/${this.state.userId}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(body => {
        console.log(body)
        this.setState({
          error: body.error,
          recipes: body.recipes
        })
      })
      .catch(error => {
        this.setState({ error: "We can't find your page. Have you logged in?"})
      })
    }

  render() {
    let recipes
    if (this.state.recipes) {
      recipes = this.state.recipes.map(recipe => {
        let bookmark = () => this.deleteRecipe(recipe)
        return(
          <RecipeTile
            key={recipe.url}
            recipe={recipe}
            user={this.state.userId}
            bookmark={bookmark}
            icon="fa-minus-circle"
          />
        )
      })
    }

    return(
      <div className="grid-container">
        <div className="vertical-spacer"></div>
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell text-center">
            <h3>{this.state.error}</h3>
          </div>
          {recipes}
        </div>
      </div>
    )
  }
}

export default UserShowContainer
