import React, { Component } from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import IndexContainer from './containers/IndexContainer'
import Layout from './containers/Layout'
import SignupForm from './containers/SignupForm'
import UserShowContainer from './containers/UserShowContainer'
import RecipeShowContainer from './containers/RecipeShowContainer'
import RecipeAdd from './containers/RecipeAdd'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: 0
    }
    this.setUser = this.setUser.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/users`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        if (response.user !== null) {
          this.setState({
            username: response.user,
            userId: response.user_id
          })
        }
      })
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
        <Route path='/' component={Layout} user={this.state} setUser={this.setUser}>
          <IndexRoute component={IndexContainer} user={this.state}/>
            <Route path='/signup' component={SignupForm} setUser={this.setUser}/>
            <Route path='/users/:id' component={UserShowContainer}/>
            <Route path='/recipes/new' component={RecipeAdd} />
            <Route path='/recipes/:id' component={RecipeShowContainer}/>
        </Route>
      </Router>
    )
  }
}

export default App
