import React, { Component } from 'react'
import FormField from '../components/FormField'
import { withRouter } from 'react-router'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
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
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    let formPayloadJSON = JSON.stringify(formPayload)
    fetch(`/api/v1/users.json`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
        console.log(response.errors)
        let errors = {}
        if (response.errors) {
          console.log(Object.keys(response.errors))

          Object.keys(response.errors).forEach((key) => {
            console.log(key)
            let capitalKey = key.charAt(0).toUpperCase() + key.slice(1)
            if (key === 'password_confirmation') {
              capitalKey = 'Password Confirmation'
            }
            errors[key] = `${capitalKey} ${response.errors[key][0]}`
          })
          this.setState({ errors: errors })
        } else {
          this.props.router.push('/')
        }
      })
  }

  render() {
    let errorDiv
    let errorItems
    let currentState = this.state.errors
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <h1>Signup</h1>
        {errorDiv}
        <FormField
          type="text"
          name="name"
          label="Name"
          value={this.state.name}
          handleChange={this.handleChange}
        />
        <FormField
          type="text"
          name="email"
          label="Email"
          value={this.state.email}
          handleChange={this.handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          value={this.state.password}
          handleChange={this.handleChange}
        />
        <FormField
          type="password"
          name="passwordConfirmation"
          label="Password Confirmation"
          value={this.state.passwordConfirmation}
          handleChange={this.handleChange}
        />
        <input type="submit" className="button" value="Submit" />
      </form>
    )
  }
}

export default withRouter(SignupForm)
