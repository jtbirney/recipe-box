import React, { Component } from 'react'
import { withRouter } from 'react-router'
import FormField from '../components/FormField'

class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      name: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      user: {
        name: this.state.name,
        password: this.state.password
      }
    }
    let formPayloadJSON = JSON.stringify(formPayload)
    fetch(`/api/v1/sessions.json`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
        if (response.status === "FAILURE") {
          this.setState({ errors: { login: response.message } })
        } else {
          this.props.logIn(response.user.name, response.user.id)
        }
      })
  }

  render() {
    let errorDiv
    let errorItems
    let currentState = this.state.errors
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<p key={error}>{error}</p>)
      })
      errorDiv = <div className="callout alert text-center">{errorItems}</div>
    }

    return(
      <div className="grid-x callout">
        <div className="small-12 medium-6 medium-offset-6 cell">
          <form onSubmit={this.handleSubmit} id="login">
            <div className="grid-x grid-margin-x">
              <div className="shrink cell">
                <h4>Sign In</h4>
              </div>
              <div className="auto cell">
                <FormField
                  type="text"
                  name="name"
                  label="Name"
                  value={this.state.name}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="auto cell">
                <FormField
                  type="password"
                  name="password"
                  label="Password"
                  value={this.state.password}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="shrink cell">
                <input type="submit" className="button" value="Submit" id="sign-in-submit"/>
              </div>
            </div>
          </form>
          {errorDiv}
        </div>
      </div>
    )
  }
}

export default SigninForm
