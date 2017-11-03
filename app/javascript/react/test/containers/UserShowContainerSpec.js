import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import UserShowContainer from '../../src/containers/UserShowContainer'
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
    spyOn(UserShowContainer.prototype, 'deleteRecipe')
    spyOn(UserShowContainer.prototype, 'componentDidMount')
    wrapper = mount(
      <UserShowContainer
        params={user}
      />
    )
  })

  it('should not render a RecipeTile if the user has no recipes', () => {
    expect(wrapper.find(RecipeTile)).not.toBePresent()
  })

  it('should render a RecipeTile if the user has recipes', () => {
    wrapper.setState({ recipes: newRecipe })
    expect(wrapper.find(RecipeTile)).toBePresent()
  })

  it('should not render an error', () => {
    expect(wrapper.find('h3')).toHaveText('')
  })

  it('should render an error if the user is not logged in', () => {
    wrapper.setState({ error: newError })
    expect(wrapper.find('h3')).toHaveText('Can\'t find your recipes.')
  })
})
