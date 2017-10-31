import React from 'react'

const RecipeTile = props => {
  return(
    <div className="small-6 medium-4 cell callout text-center">
      <a href={props.recipe.url}>
        <div>
          <img src={props.recipe.image} alt={props.recipe.name}></img>
        </div>
        <div>
          <h4>{props.recipe.title}</h4>
        </div>
      </a>
    </div>
  )
}

export default RecipeTile
