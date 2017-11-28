import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import { Link } from 'react-router';
import NavigationMenu from '../../src/components/NavigationMenu'

describe('NavigationMenu', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NavigationMenu
        userId={1}
      />
    )
  })

  it('should render div', () => {
    expect(wrapper.find('div').first()).toHaveClassName('grid-x navigation-menu');
  });

  it('should render a link to the user\'s recipes', () => {
    expect(wrapper.find('a').first()).toHaveText('My Recipes')
    // expect(wrapper.find('a').first()).toHaveProp('to', '/users/1')
  })

  it('should render a link to the user\'s menu', () => {
    expect(wrapper.find('a').at(1)).toHaveText('My Menu')
    // expect(wrapper.find('a').at(1)).toHaveProp('href', '/menu')
  })

  it('should render a link to add a new recipe', () => {
    expect(wrapper.find('a').at(2)).toHaveText('Add New Recipe')
    // expect(wrapper.find('a').at(2)).toHaveProp('href', '/recipes/new')
  })

  it('should render a link to the user\'s menu', () => {
    expect(wrapper.find('a').at(3)).toHaveText('Log Out')
  })
});
