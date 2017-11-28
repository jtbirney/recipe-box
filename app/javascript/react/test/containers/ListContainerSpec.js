import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import ListContainer from '../../src/containers/ListContainer'

describe('Layout', () => {
  let wrapper,
      list = ['1 cup flour', '3 tablespoons water']

  beforeEach(() => {
    spyOn(ListContainer.prototype, 'toggleForm').and.callThrough()
    spyOn(ListContainer.prototype, 'handleChange').and.callThrough()
    spyOn(ListContainer.prototype, 'saveForm')
    spyOn(ListContainer.prototype, 'addField').and.callThrough()
    wrapper = mount(
      <ListContainer
        type="ingredients"
        heading="Ingredients"
        editable={true}
        list={list}
      />
    )
  })

  it('should render an h3 tag with the text Ingredients', () => {
    expect(wrapper.find('h3')).toHaveText('Ingredients')
  })

  it('should render the list items as p tags', () => {
    expect(wrapper.find('p').at(0)).toHaveText('1 cup flour')
    expect(wrapper.find('p').at(1)).toHaveText('3 tablespoons water')
    expect(wrapper.find('p').at(2)).not.toBePresent()
  })

  it('should render the list as text input fields when the edit button is clicked', () => {
    wrapper.find('a').simulate('click')
    expect(ListContainer.prototype.toggleForm).toHaveBeenCalled()
    expect(wrapper.find('input').at(0)).toHaveValue('1 cup flour')
    expect(wrapper.find('input').at(1)).toHaveValue('3 tablespoons water')
    expect(wrapper.find('input').at(2)).not.toBePresent()
  })

  it('should show a plus icon to add a field when the list is being edited', () => {
    wrapper.find('a').simulate('click')
    expect(wrapper.find('.fa-plus')).toBePresent()
    wrapper.find('.fa-plus').simulate('click')
    expect(ListContainer.prototype.addField).toHaveBeenCalled()
    expect(wrapper.find('input').at(0)).toHaveValue('1 cup flour')
    expect(wrapper.find('input').at(1)).toHaveValue('3 tablespoons water')
    expect(wrapper.find('input').at(2)).toHaveValue('')
  })

  it('should call the handleChange function when a user types into one of the input fields', () => {
    wrapper.setState({ form: true })
    wrapper.find('input').first().simulate('change', {target: {value: '2 cups flour'}})
    expect(ListContainer.prototype.handleChange).toHaveBeenCalled()
  })

  it('should call the saveForm function and render the list items as p tags with the Save button is clicked', () => {
    wrapper.setState({ form: true })
    wrapper.find('a').simulate('click')
    expect(ListContainer.prototype.saveForm).toHaveBeenCalled()
    wrapper.setState({ form: false })
    expect(wrapper.find('p').at(0)).toHaveText('1 cup flour')
    expect(wrapper.find('p').at(1)).toHaveText('3 tablespoons water')
    expect(wrapper.find('p').at(2)).not.toBePresent()
  })
})
