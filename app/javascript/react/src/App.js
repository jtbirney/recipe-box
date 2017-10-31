import React, { Component } from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import IndexContainer from './containers/IndexContainer'
import Layout from './containers/Layout'
import SignupForm from './containers/SignupForm'
import UserShowContainer from './containers/UserShowContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: 0
    }
    this.setUser = this.setUser.bind(this)
  }

  setUser(username, userId) {
    this.setState({
      username: username,
      userId: userId
    })
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={Layout} setUser={this.setUser}>
          <IndexRoute component={IndexContainer} user={this.state}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/users/:id' component={UserShowContainer}/>
        </Route>
      </Router>
    )
  }
}

export default App
