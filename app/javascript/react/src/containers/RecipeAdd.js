import React, { Component } from 'react'
import { withRouter } from 'react-router'
import FormField from '../components/FormField'

class RecipeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ url: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = { recipe: { url: this.state.url }}
    let formPayloadJSON = JSON.stringify(formPayload)
    fetch('/api/v1/recipes', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
        this.props.router.push(`/recipes/${response.recipe.id}`)
      })
    }

  render() {
    return(
      <div className="callout">
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell">
            <h3>Add Recipe</h3>
            <form onSubmit={this.handleSubmit} className="grid-x">
              <div className="auto cell">
                <FormField
                  type="text"
                  name="add-recipe-url"
                  label="URL"
                  value={this.state.url}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="shrink cell">
                <input type="submit" className="button large" value="Add" id="add-recipe-submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeAdd
