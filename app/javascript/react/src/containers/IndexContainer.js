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
    if (document.getElementBy)
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
        <div>
          {this.state.recipe}
        </div>
        <div className="grid-x grid-margin-x">
          <div className="small-6 cell text-center">
            <a className="button expanded" onClick={this.handleClick}>Find New Recipes</a>
          </div>
          <div className="small-6 cell text-center">
            <a className="button expanded" onClick={this.handleClick}>My Recipes</a>
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          {recipes}
        </div>
      </div>
    )
  }
}

export default IndexContainer
