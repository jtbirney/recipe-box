import React, { Component } from 'react'
import ListContainer from './ListContainer'
import NoteContainer from './NoteContainer'

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {},
      ingredientsForm: false
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
        this.setState({
          recipe: body
        })
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
          <div className="small-12 cell">
            <h1>{this.state.recipe.title}</h1>
          </div>
          <div className="small-12 medium-6 cell text-center">
            <img src={this.state.recipe.image} alt={this.state.recipe.title} />
            <br/>
            <a href={this.state.recipe.url} target="_blank">View Original</a>
          </div>
          {this.state.recipe.ingredients &&
            <div className="small-12 medium-6 cell">
              <ListContainer
                recipeId={this.state.recipe.id}
                list={this.state.recipe.ingredients}
                type="ingredients"
                heading="Ingredients"
                editable={this.state.recipe.editable}
              />
            </div>
          }
          {this.state.recipe.directions &&
            <div className="small-12 cell">
              <ListContainer
                recipeId={this.state.recipe.id}
                list={this.state.recipe.directions}
                type="directions"
                heading="Directions"
                editable={this.state.recipe.editable}
              />
            </div>
          }
          {this.state.recipe.note &&
            <NoteContainer
              note={this.state.recipe.note}
            />
          }
        </div>
      </div>
    )
  }
}

export default RecipeShowContainer
