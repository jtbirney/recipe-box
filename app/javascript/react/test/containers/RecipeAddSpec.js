import React, { Component } from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import RecipeAdd from '../../src/containers/RecipeAdd'
import FormField from '../../src/components/FormField'

describe('RecipeAdd', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(RecipeAdd.prototype, 'handleChange').and.callThrough()
    spyOn(RecipeAdd.prototype, 'handleSubmit')
    wrapper = mount(
      <RecipeAdd />
    )
  })

  it('should render an h3 tag with the text Add Recipe', () => {
    expect(wrapper.find('h3')).toHaveText('Add Recipe')
  })

  it('should render a form with a form field component', () => {
    expect(wrapper.find('form')).toBePresent()
    expect(wrapper.find(FormField)).toBePresent()
    expect(wrapper.find('input').at(1)).toHaveValue('Add')
  })

  it('should call the handleChange function when the field is changed', () => {
    wrapper.find('input').at(0).simulate('change', {target: {value: 'https://'}})
    expect(RecipeAdd.prototype.handleChange).toHaveBeenCalled()
    expect(wrapper.find('input').at(0)).toHaveValue('https://')
  })

  it('should call the handle submit function when the add button is clicked', () => {
    wrapper.find('form').simulate('submit')
    expect(RecipeAdd.prototype.handleSubmit).toHaveBeenCalled()
  })
})
