import React, { Component } from 'react'

class NoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false,
      noteText: this.props.note.text
    }
    this.toggleNoteField = this.toggleNoteField.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNote = this.saveNote.bind(this)
  }

  toggleNoteField(event) {
    event.preventDefault()
    this.setState({ form: !this.state.form })
  }

  handleChange(event) {
    let value = event.target.value
    this.setState({ noteText: value })
  }

  saveNote(event) {
    event.preventDefault()
    let formPayload = { user_recipe: { note: this.state.noteText } }
    let formPayloadJSON = JSON.stringify(formPayload)
    fetch(`/api/v1/user_recipes/${this.props.note.note_id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          form: !this.state.form,
          noteText: response.note
        })
      })
  }

  render() {
    return(
      <div className="small-12 cell">
        {!this.state.form &&
          <div>
            {this.state.noteText &&
              <div>
                <h3>Notes</h3>
                <a onClick={this.toggleNoteField}>Edit</a>
                <br/>
                {this.state.noteText}
              </div>
            }
            {!this.state.noteText &&
              <div>
                <a className="button" onClick={this.toggleNoteField}>Add a Note</a>
              </div>
            }
          </div>
        }
        {this.state.form &&
          <div>
            <h3>Notes</h3>
            <textarea id="note-field" name="note-field" onChange={this.handleChange} value={this.state.noteText} placeholder="Add Note Here"></textarea>
            <a className="button" onClick={this.saveNote}>Save</a>
          </div>
        }
      </div>
    )
  }
}

export default NoteContainer
