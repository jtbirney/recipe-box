import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import Layout from '../../src/containers/Layout'
import SigninForm from '../../src/containers/SigninForm'
import NavigationMenu from '../../src/components/NavigationMenu'

describe('Layout', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(Layout.prototype, 'logIn').and.callThrough()
    spyOn(Layout.prototype, 'logOut')
    spyOn(Layout.prototype, 'showLogin').and.callThrough()
    spyOn(Layout.prototype, 'fetchCurrentUser')
    spyOn(Layout.prototype, 'componentWillReceiveProps')
    wrapper = mount(
      <Layout />
    )
  })

  it('should render a div with className top-bar', () => {
    expect(wrapper.find('.top-bar')).toHaveTagName('div')
  });

  it('should render a link with className menu-text and text "MenuBox"', () => {
    expect(wrapper.find('.menu-text')).toHaveTagName('h2')
    expect(wrapper.find('.menu-text')).toHaveText('MenuBox')
  });

  it('should render a link with className button and text Sign In', () => {
    expect(wrapper.find('.button').first()).toHaveText('Sign In')
  });

  it('should not render a SigninForm Component', () => {
    expect(wrapper.find(SigninForm)).not.toBePresent()
  });

  it('should render a SigninForm Component after the Sign In button is clicked', () => {
    wrapper.find('#show-sign-in').first().simulate('click')
    expect(wrapper.find(SigninForm)).toBePresent()
  });

  it('should render a link with className button and text Sign Up', () => {
    expect(wrapper.find('.button').at(2)).toHaveText('Sign Up')
  });

  it('should render a link with className button and text "username" when user is logged in', () => {
    wrapper.setState({ username: "username" })
    expect(wrapper.find('#username')).toHaveText('username')
  });

  it('should not render a NavigationMenu component when a user is not signed in', () => {
    expect(wrapper.find(NavigationMenu)).not.toBePresent()
  })

  it('should render a NavigationMenu component when a user is signed in', () => {
    wrapper.setState({ username: "username" })
    expect(wrapper.find(NavigationMenu)).toBePresent()
  })
});
