import React, { Component } from 'react'

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {}
    }
  }

  componentDidMount() {
    fetch(`/api/v1/recipes/${this.props.params.id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(body => {
        console.log(body)
        this.setState({ recipe: body.recipe })
      })
  }

  render() {
    let ingredients
    if(this.state.recipe.ingredients) {
      ingredients = this.state.recipe.ingredients.map(ingredient => {
        return(<p key={ingredient}>{ingredient}</p>)
      })
    }

    let directions
    if(this.state.recipe.directions) {
      directions = this.state.recipe.directions.map(direction => {
        return(<p key={direction}>{direction}</p>)
      })
    }

    return(
      <div className="callout">
        <div className="grid-x grid-margin-x">
          <div className="small-12 medium-6 cell">
            <h1>{this.state.recipe.title}</h1>
            <a href={this.state.recipe.url} target="_blank">View Original</a>
            <h3>Ingredients</h3>
            {ingredients}
          </div>
          <div className="small-12 medium-6 cell text-center">
            <img src={this.state.recipe.image} alt={this.state.recipe.title} />
          </div>
          <div className="small-12 cell">
            <h3>Directions</h3>
            {directions}
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeShowContainer
