import React from 'react'
import { Link } from 'react-router';

const NavigationMenu = props => {
  return(
    <div className="grid-x navigation-menu">
      <div className="auto cell"></div>
      <div className="shrink cell">
        <div className="menu">
          <Link className="menu-link" to={`/users/${props.userId}`}>My Recipes</Link>
          <Link className="menu-link" to='/menu'>My Menu</Link>
          <Link className="menu-link" to='/recipes/new'>Add New Recipe</Link>
          <a className="menu-link" onClick={props.logOut}>Log Out</a>
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
