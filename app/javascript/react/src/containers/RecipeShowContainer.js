import React, { Component } from 'react'
import ListContainer from './ListContainer'
import NoteContainer from './NoteContainer'

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {}
    }
    this.addToRecipes = this.addToRecipes.bind(this)
    this.addToMenu = this.addToMenu.bind(this)
    this.deleteFromRecipes = this.deleteFromRecipes.bind(this)
    this.deleteFromMenu = this.deleteFromMenu.bind(this)
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
      console.log(response);
      let newRecipe = this.state.recipe
      newRecipe.saved = true
      newRecipe.note = response.note
      this.setState({ recipe: newRecipe })
    })
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
        console.log(response);
        let newRecipe = this.state.recipe
        newRecipe.saved = true
        newRecipe.menu = true
        newRecipe.note = response.note
        this.setState({ recipe: newRecipe })
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
      let newRecipe = this.state.recipe
      newRecipe.saved = false
      newRecipe.menu = false
      newRecipe.note = null
      this.setState({ recipe: newRecipe })
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
        let newRecipe = this.state.recipe
        newRecipe.menu = false
        this.setState({ recipe: newRecipe })
      })
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

    let recipesIcon = "fa-plus"
    let recipesFunction = () => this.addToRecipes(this.state.recipe)
    if (this.state.recipe.saved) {
      recipesIcon = "fa-minus"
      recipesFunction = () => this.deleteFromRecipes(this.state.recipe)
    }

    let menuIcon = "fa-plus"
    let menuFunction = () => this.addToMenu(this.state.recipe)
    if (this.state.recipe.menu) {
      menuIcon = "fa-minus"
      menuFunction = () => this.deleteFromMenu(this.state.recipe)
    }

    return(
      <div className="callout">
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell text-center">
            <h1>{this.state.recipe.title}</h1>
          </div>
          <div className="small-12 medium-6 cell">
            <img src={this.state.recipe.image} alt={this.state.recipe.title} className="recipe-show-image"/>
            <br/>
              <div className="grid-x text-center">
                <div className="shrink cell">
                  {this.state.recipe.editable &&
                    <div>
                      <a className="button small" onClick={recipesFunction}><i className={`fa ${recipesIcon}`} aria-hidden="true"></i> Recipes</a>
                      <a className="button small" onClick={menuFunction}><i className={`fa ${menuIcon}`} aria-hidden="true"></i> Menu</a>
                    </div>
                  }
                </div>
                <div className="auto cell recipe-source">
                  <a href={this.state.recipe.url} target="_blank">View Original</a>
                </div>
              </div>
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
