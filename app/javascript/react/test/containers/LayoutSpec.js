import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import Layout from '../../src/containers/Layout'
import SigninForm from '../../src/containers/SigninForm'

describe('Layout', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(Layout.prototype, 'logIn')
    spyOn(Layout.prototype, 'logOut')
    spyOn(Layout.prototype, 'componentDidMount')
    wrapper = mount(
      <Layout />
    )
  })

  it('should render a div with className top-bar', () => {
    expect(wrapper.find('.top-bar')).toHaveTagName('div')
  });

  it('should render a link with className menu-text and text "MenuBox"', () => {
    expect(wrapper.find('.menu-text')).toHaveTagName('h3')
    expect(wrapper.find('.menu-text')).toHaveText('MenuBox')
  });

  it('should render a link with className button and text Sign In', () => {
    expect(wrapper.find('.button').first()).toHaveText('Sign In')
  });

  it('should render a SigninForm Component', () => {
    expect(wrapper.find(SigninForm)).toBePresent()
  });

  it('should render a link with className button and text Sign Up', () => {
    expect(wrapper.find('.button').at(2)).toHaveText('Sign Up')
  });

  it('should render a link with className button and text "username" when user is logged in', () => {
    wrapper.setState({ username: "username" })
    expect(wrapper.find('#username')).toHaveText('username')
  });

  it('should render a link with className button and text "Log Out" when user is logged in', () => {
    wrapper.setState({ username: "username" })
    expect(wrapper.find('.button').at(1)).toHaveText('Log Out')
  });

  it('should call the LogOut function when a user clicks logout', () => {
    wrapper.setState({ username: "username" })
    wrapper.find('.button').at(1).simulate('click')
    expect(Layout.prototype.logOut).toHaveBeenCalled()
  });
});
