import React from 'react'

const RecipeTile = props => {
  return(
    <div className="medium-4 columns">
      <img src={props.recipe.image} alt={props.recipe.name}></img>
      <a href={props.recipe.url}>{props.recipe.title}</a>
    </div>
  )
}

export default RecipeTile
