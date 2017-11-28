import React, { Component } from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import MenuShowContainer from '../../src/containers/MenuShowContainer'
import RecipeTileContainer from '../../src/containers/RecipeTileContainer'

describe('MenuShowContainer', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(MenuShowContainer.prototype, 'updateRecipes').and.callThrough()
    spyOn(MenuShowContainer.prototype, 'fetchCurrentUser')
    spyOn(MenuShowContainer.prototype, 'componentDidMount')
    wrapper = mount(
      <MenuShowContainer />
    )
  })

  it('should render an h1 tag with the text My Menu', () => {
    expect(wrapper.find('h1')).toHaveText('My Menu')
  })

  it('should render a RecipeTileContainer component', () => {
    expect(wrapper.find(RecipeTileContainer)).toBePresent()
  })
})
