import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import IndexContainer from './containers/IndexContainer'
import Layout from './containers/Layout'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={IndexContainer} />
      </Route>
    </Router>
  )
}

export default App
