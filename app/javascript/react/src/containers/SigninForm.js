import React, { Component } from 'react'
import FormField from '../components/FormField'
import { withRouter } from 'react-router'

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
        console.log(response)
        if (response.status === "FAILURE") {
          console.log(response.message)
          this.setState({ errors: { login: response.message } })
        } else {
          $('#login').foundation('close')
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
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <span>
        <form onSubmit={this.handleSubmit} className="dropdown-pane" id="login" data-dropdown data-auto-focus="true" data-close-on-click="true">
          <h1>Sign In</h1>
          {errorDiv}
          <FormField
            type="text"
            name="name"
            label="Name"
            value={this.state.name}
            handleChange={this.handleChange}
          />
          <FormField
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <input type="submit" className="button" value="Submit" id="sign-in-submit"/>
        </form>
      </span>
    )
  }
}

export default SigninForm
