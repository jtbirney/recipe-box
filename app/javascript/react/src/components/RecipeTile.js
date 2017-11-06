import React, { Component } from 'react'
import { Link } from 'react-router';

class RecipeTile extends Component {
  render() {
    return(
      <div className="small-6 medium-4 cell callout text-center">
        {this.props.user !== 0 &&
          <div className="grid-x">
            <div className="small-10 cell"></div>
            <div className="small-2 cell" onClick={this.props.bookmark}>
              <i className={`fa ${this.props.icon} fa-2x`} aria-hidden="true"></i>
            </div>
          </div>
        }
        <Link to={`/recipes/${this.props.recipe.id}`}>
          <div>
            <img src={this.props.recipe.image} alt={this.props.recipe.name}></img>
          </div>
          <div>
            <h4>{this.props.recipe.title}</h4>
          </div>
        </Link>
      </div>
    )
  }
}

export default RecipeTile
