import React, { Component } from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import RecipeShowContainer from '../../src/containers/RecipeShowContainer'
import ListContainer from '../../src/containers/ListContainer'
import NoteContainer from '../../src/containers/NoteContainer'

describe('RecipeShowContainer', () => {
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
    spyOn(RecipeShowContainer.prototype, 'addToRecipes')
    spyOn(RecipeShowContainer.prototype, 'addToMenu')
    spyOn(RecipeShowContainer.prototype, 'deleteFromRecipes')
    spyOn(RecipeShowContainer.prototype, 'deleteFromMenu')
    spyOn(RecipeShowContainer.prototype, 'componentDidMount')
    wrapper = mount(
      <RecipeShowContainer />
    )
    wrapper.setState({ recipe: recipe })
  })

  it('should render an h1 tag with the recipe title', () => {
    expect(wrapper.find('h1')).toHaveText('Chicken Soup')
  })

  it('should render an image tag with the recipe image', () => {
    expect(wrapper.find('img')).toHaveProp('src', 'animagewebiste.com')
  })

  it('should render button to add the recipe to the user\'s recipes', () => {
    wrapper.find('a').at(0).simulate('click')
    expect(wrapper.find('a').at(0)).toHaveText(' Recipes')
    expect(RecipeShowContainer.prototype.addToRecipes).toHaveBeenCalled()
  })

  it('should render button to add the recipe to the user\'s menu', () => {
    wrapper.find('a').at(1).simulate('click')
    expect(wrapper.find('a').at(1)).toHaveText(' Menu')
    expect(RecipeShowContainer.prototype.addToMenu).toHaveBeenCalled()
  })

  it('should render a link to the original recipe website', () => {
    expect(wrapper.find('a').at(2)).toHaveProp('href', 'website.com')
    expect(wrapper.find('a').at(2)).toHaveText('View Original')
  })

  it('should render a button to remove the recipe from the user\'s recipes if it is saved', () => {
    recipe.saved = true
    wrapper.setState({ recipe: recipe })
    wrapper.find('a').at(0).simulate('click')
    expect(wrapper.find('a').at(0)).toHaveText(' Recipes')
    expect(RecipeShowContainer.prototype.deleteFromRecipes).toHaveBeenCalled()
  })

  it('should render a button to remove the recipe from the user\'s menu if it is on their menu', () => {
    recipe.menu = true
    wrapper.setState({ recipe: recipe })
    wrapper.find('a').at(1).simulate('click')
    expect(wrapper.find('a').at(1)).toHaveText(' Menu')
    expect(RecipeShowContainer.prototype.deleteFromMenu).toHaveBeenCalled()
  })

  it('should render a ListContainer component', () => {
    expect(wrapper.find(ListContainer)).toBePresent()
  })

  it('should render a NoteContainer component', () => {
    expect(wrapper.find(NoteContainer)).toBePresent()
  })
})
