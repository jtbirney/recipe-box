import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import IndexContainer from '../../src/containers/IndexContainer'
import RecipeTile from '../../src/components/RecipeTile'

describe('IndexContainer', () => {
  let wrapper;
  let recipe = [
    {
      title: "Chicken Breast With Salsa",
      image: "https://www.edamam.com/web-img/b4e/b4ecf425e5fcd21390a1203976f5fef8.jpg",
      url: "http://www.epicurious.com/recipes/food/views/Chicken-Breast-with-Salsa-242444"
    }
  ]

  beforeEach(() => {
    wrapper = mount(
      <IndexContainer />
    )
  })

  it('should render a button to find new Recipes', () => {
    expect(wrapper.find('.button')).toHaveText('Find New Recipes');
  });

  it('should not render Recipe Tiles', () => {
    expect(wrapper.find(RecipeTile)).not.toBePresent()
  })

  it('should render recipe Tiles after clicking on the button', () => {
    wrapper.setState({ recipes: recipe })
    expect(wrapper.find(RecipeTile)).toBePresent()
  })
});
