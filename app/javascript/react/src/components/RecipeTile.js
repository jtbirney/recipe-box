import React, { Component } from 'react'
import { Link } from 'react-router';

class RecipeTile extends Component {

  render() {
    let recipesIcon = "fa-plus"
    let recipesFunction = () => this.props.handleAddRecipes()
    if (this.props.recipe.saved) {
      recipesIcon = "fa-minus"
      recipesFunction = () => this.props.handleDeleteRecipes()
    }

    let menuIcon = "fa-plus"
    let menuFunction = () => this.props.handleAddMenu()
    if (this.props.recipe.menu) {
      menuIcon = "fa-minus"
      menuFunction = () => this.props.handleDeleteMenu()
    }

    return(
      <div className="small-12 medium-6 large-4 cell callout text-center">
        <Link to={`/recipes/${this.props.recipe.id}`}>
          <div className="tile-image-div">
              <img src={this.props.recipe.image} alt={this.props.recipe.name} ></img>
          </div>
        </Link>
        {this.props.user !== 0 &&
          <div className="grid-x">
            <div className="small-6 cell">
              <a className="button small expanded" onClick={recipesFunction}><i className={`fa ${recipesIcon}`} aria-hidden="true"></i>{this.props.recipestext}</a>
            </div>
            <div className="small-6 cell">
              <a className="button small expanded" onClick={menuFunction}><i className={`fa ${menuIcon}`} aria-hidden="true"></i>{this.props.menuText}</a>
            </div>
          </div>
        }
        <div className="tile-title">
          <h4>{this.props.recipe.title}</h4>
        </div>
      </div>
    )
  }
}

export default RecipeTile
