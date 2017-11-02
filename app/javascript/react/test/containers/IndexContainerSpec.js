import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import IndexContainer from '../../src/containers/IndexContainer'
import RecipeTile from '../../src/components/RecipeTile'
import SearchField from '../../src/containers/SearchField'

describe('IndexContainer', () => {
  let wrapper,
      recipe = [
        {
          title: "Chicken Breast With Salsa",
          image: "https://www.edamam.com/web-img/b4e/b4ecf425e5fcd21390a1203976f5fef8.jpg",
          url: "http://www.epicurious.com/recipes/food/views/Chicken-Breast-with-Salsa-242444"
        }
      ],
      recipe2 = [
        {
          title: "Chicken Soup",
          image: "https://www.edamam.com/web-img/chicken-soup.jpg",
          url: "http://www.epicurious.com/recipes/food/views/Chicken-Soup"
        }
      ]

  beforeEach(() => {
    spyOn(IndexContainer.prototype, 'handleShowSearchClick').and.callThrough()
    spyOn(IndexContainer.prototype, 'handleSearchChange').and.callThrough()
    spyOn(IndexContainer.prototype, 'createUrl').and.callThrough()
    spyOn(IndexContainer.prototype, 'handleSearchClick')
    spyOn(IndexContainer.prototype, 'showMore')
    spyOn(IndexContainer.prototype, 'fetchCurrentUser')
    spyOn(IndexContainer.prototype, 'saveRecipe')
    wrapper = mount(
      <IndexContainer />
    )
  })

  it('should call fetchCurrentUser', () => {
    expect(IndexContainer.prototype.fetchCurrentUser).toHaveBeenCalled()
  })

  it('should render a button to find new Recipes', () => {
    expect(wrapper.find('.button')).toHaveText('Find New Recipes');
    wrapper.find('.button').simulate('click')
    expect(IndexContainer.prototype.handleShowSearchClick).toHaveBeenCalled()
    expect(wrapper.find(SearchField)).toBePresent()
  });

  it('should not render a button for My Recipes if the user is not logged in', () => {
    expect(wrapper.find('#my-recipes')).not.toBePresent()
  })

  it('should render a button for My Recipes if the user is logged in', () => {
    wrapper.setState({ userId: 1 })
    expect(wrapper.find('#my-recipes').first()).toHaveText('My Recipes')
  })

  it('should not render any errors', () => {
    expect(wrapper.find('.alert')).not.toBePresent()
  })

  it('should render any errors if search returns no results', () => {
    wrapper.setState({ error: 'No results'})
    expect(wrapper.find('.alert')).toHaveText('No results')
  })

  it('should not render Recipe Tiles or SearchField', () => {
    expect(wrapper.find(RecipeTile)).not.toBePresent()
    expect(wrapper.find(SearchField)).not.toBePresent()
  })

  it('should render recipe Tiles after clicking on the search button', () => {
    wrapper.setState({ recipes: recipe })
    expect(wrapper.find(RecipeTile).first()).toHaveText('Chicken Breast With Salsa')
  })

  it('should render additional recipes when the showMore button is clicked', () => {
    wrapper.setState({ recipes: recipe })
    wrapper.find("#show-more").first().simulate('click')
    expect(IndexContainer.prototype.showMore).toHaveBeenCalled()
    wrapper.setState({ recipes: recipe.concat(recipe2) })
    expect(wrapper.find(RecipeTile).at(1)).toHaveText('Chicken Soup')
  })
});
