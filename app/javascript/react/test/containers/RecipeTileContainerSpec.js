import React, { Component } from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import RecipeTileContainer from '../../src/containers/RecipeTileContainer'
import RecipeTile from '../../src/components/RecipeTile'

describe('RecipeTileContainer', () => {
  let wrapper,
      recipe = {
        id: 1,
        url: "website.com",
        image: "animagewebiste.com",
        name: "Chicken Soup",
        title: "Chicken Soup",
        ingredients: ["First Ingredient", "Second Ingredient"],
        directions: ["Step 1", "Step 2"],
        saved: false,
        menu: false,
        editable: true,
        note: "Great"
      }

  beforeEach(() => {
    spyOn(RecipeTileContainer.prototype, 'addToRecipes')
    spyOn(RecipeTileContainer.prototype, 'addToMenu')
    spyOn(RecipeTileContainer.prototype, 'deleteFromRecipes')
    spyOn(RecipeTileContainer.prototype, 'deleteFromMenu')
    wrapper = mount(
      <RecipeTileContainer
        recipes={[recipe]}
      />
    )
  })

  it('should render a RecipeTile', () => {
    expect(wrapper.find(RecipeTile)).toBePresent()
  })
})
