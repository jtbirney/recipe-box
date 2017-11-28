import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import UserShowContainer from '../../src/containers/UserShowContainer'
import RecipeTileContainer from '../../src/containers/RecipeTileContainer'
import RecipeTile from '../../src/components/RecipeTile'

describe('UserShowContainer', () => {
  let wrapper,
      user = {
        username: 'user',
        id: 1
      },
      newRecipe = [
        {
          url: "fakewebsite.com",
          image: "imagesite.com",
          name: "Best Recipe",
          title: "Best Recipe"
        }
      ],
      newError = 'Can\'t find your recipes.'

  beforeEach(() => {
    spyOn(UserShowContainer.prototype, 'updateRecipes').and.callThrough()
    spyOn(UserShowContainer.prototype, 'componentDidMount')
    wrapper = mount(
      <UserShowContainer
        params={user}
      />
    )
  })

  it('should render a RecipeTileContainer if the user has recipes', () => {
    expect(wrapper.find(RecipeTileContainer)).toBePresent()
  })

  it('should render an h1 with the text My Recipes', () => {
    expect(wrapper.find('h1')).toHaveText('My Recipes')
  })
})
