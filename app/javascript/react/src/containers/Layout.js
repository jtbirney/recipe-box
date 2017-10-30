import React from 'react'

const Layout = props => {
  return(
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <h3 className="menu-text">Recipe-Box</h3>
        </div>
        <div className="top-bar-right">

        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Layout
