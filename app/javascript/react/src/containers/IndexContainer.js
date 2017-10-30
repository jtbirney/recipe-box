import React, { Component } from 'react'
import RecipeTile from '../components/RecipeTile'

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: '',
      recipes: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    fetch(`/api/v1/recipes`)
      .then(response => response.json())
      .then(body => {
        this.setState({ recipes: body.recipes })
      })
  }

  render() {
    let recipes = this.state.recipes.map(recipe => {
      return(
        <RecipeTile
          key={recipe.url}
          recipe={recipe}
        />
      )
    })
    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <h3 className="title">Recipe-Box</h3>
          </div>
        </div>
        <div>
          {this.state.recipe}
        </div>
        <div className="row">
          <div className="small-12 columns">
            <a className="button expanded horizontal-center" onClick={this.handleClick}>Get Recipes</a>
          </div>
        </div>
        <div className="row">
          {recipes}
        </div>
      </div>
    )
  }
}

export default IndexContainer
