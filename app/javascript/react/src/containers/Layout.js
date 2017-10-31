import React, { Component } from 'react'
import { Link } from 'react-router';
import SigninForm from './SigninForm'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: 0
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logIn(username, userId) {
    this.setState({
      username: username,
      userId: userId
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
            <Link to='/'><h3 className="menu-text">MenuBox</h3></Link>
          </div>
          <div className="top-bar-right">
            {this.state.username === "" &&
              <div>
                <a className="button" type="button" data-toggle="login">Sign In</a>
                <SigninForm logIn={this.logIn} />
                <Link className="button" to='/signup'>Sign Up</Link>
              </div>
            }
            { this.state.username !== "" &&
              <div>
                <a className="button" id="username">{this.state.username}</a>
                <a className="button" onClick={this.logOut}>Log Out</a>
              </div>
            }
          </div>
        </div>
        <div className="grid-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
