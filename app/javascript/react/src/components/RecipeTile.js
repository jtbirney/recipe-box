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
      <div className="small-6 medium-4 cell callout text-center">
        <Link to={`/recipes/${this.props.recipe.id}`}>
          <div>
            <img src={this.props.recipe.image} alt={this.props.recipe.name}></img>
          </div>
          <div>
            <h4>{this.props.recipe.title}</h4>
          </div>
        </Link>
        {this.props.user !== 0 &&
          <div className="grid-x">
            <div className="auto cell"></div>
            <div className="shrink cell">
              <a className="button small" onClick={recipesFunction}><i className={`fa ${recipesIcon}`} aria-hidden="true"></i>{this.props.recipestext}</a>
              <a className="button small" onClick={menuFunction}><i className={`fa ${menuIcon}`} aria-hidden="true"></i>{this.props.menuText}</a>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default RecipeTile
