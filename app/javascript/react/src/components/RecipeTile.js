import React from 'react'
import { Link } from 'react-router';

const RecipeTile = props => {
  return(
    <div className="small-6 medium-4 cell callout text-center">
      {props.user !== 0 &&
        <div className="grid-x">
          <div className="small-10 cell"></div>
          <div className="small-2 cell" onClick={props.bookmark}>
            <i className={`fa ${props.icon} fa-2x`} aria-hidden="true"></i>
          </div>
        </div>
      }
      <Link to={`/recipes/${props.recipe.id}`}>
        <div>
          <img src={props.recipe.image} alt={props.recipe.name}></img>
        </div>
        <div>
          <h4>{props.recipe.title}</h4>
        </div>
      </Link>
    </div>
  )
}

export default RecipeTile
