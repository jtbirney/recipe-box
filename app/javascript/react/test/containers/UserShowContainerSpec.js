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
      }

  beforeEach(() => {
    spyOn(UserShowContainer.prototype, 'deleteRecipe')
    spyOn(UserShowContainer.prototype, 'componentDidMount')
    wrapper = mount(
      <UserShowContainer
        params={user}
      />
    )
  })

  it('should render a RecipeTile', () => {

  })

  it('should not render an error', () => {

  })

  it('should render an error if the user is not logged in', () => {

  })
})
