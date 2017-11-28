import React, { Component } from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import NoteContainer from '../../src/containers/NoteContainer'

describe('NoteContainer', () => {
  let wrapper,
      note = {
        note_id: 1,
        text: 'This recipe is great and easy'
      };

  beforeEach(() => {
    spyOn(NoteContainer.prototype, 'toggleNoteField').and.callThrough()
    spyOn(NoteContainer.prototype, 'handleChange').and.callThrough()
    spyOn(NoteContainer.prototype, 'saveNote')
    wrapper = mount(
      <NoteContainer
        note={note}
      />
    )
  })

  it('should render an h3 tag with the text Notes', () => {
    expect(wrapper.find('h3')).toHaveText('Notes')
  })

  it('should render the note text within a div', () => {
    expect(wrapper.find('div').at(1)).toHaveText('NotesEditThis recipe is great and easy')
  })

  it('should render an edit button', () => {
    expect(wrapper.find('a')).toHaveText('Edit')
  })

  it('should show the note text in a text area field when the edit button is clicked', () => {
    wrapper.find('a').simulate('click')
    expect(NoteContainer.prototype.toggleNoteField).toHaveBeenCalled()
    expect(wrapper.find('textarea')).toHaveValue('This recipe is great and easy')
  })

  it('should call the handleChange function when the field is changed', () => {
    wrapper.find('a').simulate('click')
    wrapper.find('textarea').simulate('change', {target: {value: 'This is good'}})
    expect(NoteContainer.prototype.handleChange).toHaveBeenCalled()
    expect(wrapper.find('textarea')).toHaveValue('This is good')
  })

  it('should render a save button after the edit button is clicked which calls the saveNote function', () => {
    wrapper.find('a').simulate('click')
    expect(wrapper.find('a')).toHaveText('Save')
    wrapper.find('a').simulate('click')
    expect(NoteContainer.prototype.saveNote).toHaveBeenCalled()
  })
})
