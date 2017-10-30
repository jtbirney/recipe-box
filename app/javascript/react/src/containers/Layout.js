import React from 'react'
import { Link } from 'react-router';

const Layout = props => {
  return(
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <Link to='/'><h3 className="menu-text">Recipe-Box</h3></Link>
        </div>
        <div className="top-bar-right">
          <Link className="button small" to='/signup'>Sign Up</Link>
        </div>
      </div>
      <div className="grid-container">
        {props.children}
      </div>
    </div>
  )
}

export default Layout
