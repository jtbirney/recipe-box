import React, { Component } from 'react'

class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.list,
      form: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveForm = this.saveForm.bind(this)
    this.addField = this.addField.bind(this)
  }

  toggleForm(event) {
    event.preventDefault()
    this.setState({ form: !this.state.form })
  }

  handleChange(event) {
    let index = parseInt(event.target.name)
    let value = event.target.value
    let newList = this.state.list
    newList[index] = event.target.value
    this.setState({ list: newList })
  }

  saveForm(event) {
    event.preventDefault()
    let formPayload = { [this.props.type]: this.state.list }
    let formPayloadJSON = JSON.stringify(formPayload)
    fetch(`/api/v1/recipes/${this.props.recipeId}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(body => {
        this.setState({
          list: body[this.props.type],
          form: !this.state.form
        })
      })
  }

  addField(event) {
    event.preventDefault()
    let list = this.state.list
    let newList = list.concat([""])
    this.setState({ list: newList })
  }

  render() {
    let listItems
    if (this.state.list) {
      listItems = this.state.list.map((item, index) => {
        if (this.state.form) {
          if (this.props.type === "ingredients") {
            return(<input key={index} className="list-form" type="text" name={index} onChange={this.handleChange} value={this.state.list[index]}></input>)
          } else if (this.props.type === "directions") {
            return(<textarea key={index} className="list-form" type="text" name={index} onChange={this.handleChange} value={this.state.list[index]}></textarea>)
          }
        } else {
          return(<p key={index}>{item}</p>)
        }
      })
    }

    return(
      <div>
        <h3>{this.props.heading}</h3>
        {this.props.editable &&
          <div>
            {!this.state.form &&
              <a onClick={this.toggleForm}>Edit</a>
            }
            {this.state.form &&
              <a className="button small" onClick={this.saveForm}>Save</a>
            }
          </div>
        }
        {listItems}
        {this.state.form &&
          <i className="fa fa-plus add-field" aria-hidden="true" onClick={this.addField}></i>
        }
      </div>
    )
  }
}

export default ListContainer
