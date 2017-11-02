import React, { Component } from 'react'
import { Link } from 'react-router';
import SigninForm from './SigninForm'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: 0,
      loginField: false
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.showLogin = this.showLogin.bind(this)
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
        console.log(response)
        this.setState({
          username: "",
          userId: 0
        })
        this.props.route.setUser("", 0)
        this.props.router.push('/')
      })
    }

  showLogin(event) {
    event.preventDefault()
    this.setState({ loginField: !this.state.loginField })
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
        console.log(response)
        if (response.user !== null) {
          this.setState({
            username: response.user,
            userId: response.user_id
          })
        }
      })
  }

  render() {
    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <Link to='/'><h2 className="menu-text">MenuBox</h2></Link>
          </div>
          <div className="top-bar-right">
            {this.state.username === "" &&
              <div>
                <a className="button large" id="show-sign-in" onClick={this.showLogin}>Sign In</a>
                <Link className="button large" to='/signup'>Sign Up</Link>
              </div>
            }

            { this.state.username !== "" &&
              <div>
                <a className="button large" id="username">{this.state.username}</a>
                <a className="button large" onClick={this.logOut}>Log Out</a>
              </div>
            }
          </div>
        </div>
        {this.state.loginField && <SigninForm logIn={this.logIn} /> }
        <div className="grid-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
