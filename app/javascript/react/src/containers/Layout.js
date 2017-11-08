import React, { Component } from 'react'
import { Link } from 'react-router';
import SigninForm from './SigninForm'
import NavigationMenu from '../components/NavigationMenu'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      userId: 0,
      loginField: false
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
  }

  logIn(username, userId) {
    this.setState({
      username: username,
      userId: userId,
      loginField: false
    })
    this.props.route.setUser(username, userId)
  }

  logOut(event) {
    event.preventDefault()
    fetch(`/api/v1/sessions/1`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(response => response.json())
      .then(response => {
        this.setState({
          username: null,
          userId: 0
        })
        this.props.route.setUser(null, 0)
        this.props.router.push('/')
      })
    }

  showLogin(event) {
    event.preventDefault()
    this.setState({ loginField: !this.state.loginField })
  }

  fetchCurrentUser() {
    fetch(`/api/v1/users`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        if (response.name) {
          this.setState({
            username: response.name,
            userId: response.id
          })
        } else {
          this.setState({
            username: null,
            userId: 0
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCurrentUser()
  }

  render() {
    return(
      <div>
        <div className="top-bar expand cell">
          <div className="top-bar-left">
            <Link to='/'><h2 className="menu-text">MenuBox</h2></Link>
          </div>
          <div className="top-bar-right">
            {this.state.username === null &&
              <span>
                <a className="button large" id="show-sign-in" onClick={this.showLogin}>Sign In</a>
                <Link className="button large" to='/signup'>Sign Up</Link>
              </span>
            }

            {this.state.username !== null &&
              <span>
                <a className="button large" id="username">{this.state.username}</a>
              </span>
            }
          </div>
        </div>
        {this.state.username !== null &&
          <NavigationMenu
            username={this.state.username}
            userId={this.state.userId}
            logOut={this.logOut}
          />
        }
        {this.state.loginField && <SigninForm logIn={this.logIn} /> }
        <div className="vertical-spacer"></div>
        <div className="grid-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
