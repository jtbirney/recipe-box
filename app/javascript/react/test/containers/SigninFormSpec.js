import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import SigninForm from '../../src/containers/SigninForm'
import FormField from '../../src/components/FormField'

describe('SigninForm', () => {
  let wrapper,
      exampleUser = 'exampleUser';

  beforeEach(() => {
    spyOn(SigninForm.prototype, 'handleChange').and.callThrough()
    spyOn(SigninForm.prototype, 'handleSubmit')
    wrapper = mount(
      <SigninForm />
    )
  })

  it('should render a form with a dropdown pane', () => {
    expect(wrapper.find('form')).toHaveProp('id', 'login');
    expect(wrapper.find(FormField)).toBePresent();
    expect(wrapper.find('#sign-in-submit')).toHaveClassName('button');
    expect(wrapper.find('#sign-in-submit')).toHaveValue('Submit');
  });

  it('should call the handleChange function when the form fields are changed', () => {
    // let username = wrapper.find('input').first()
    // username.node.value = 'exampleUser'
    // username.simulate('change', username)
    // // wrapper.find('input').at(0).simulate('keypress', {key: 'a'})
    // expect(SigninForm.prototype.handleChange).toHaveBeenCalled()
    // expect(wrapper.state('name')).toBe('exampleUser')
  })

  it('should call the handleSubmit function when the submit button is clicked', () => {

  })

  it('should not return any error items initally', () => {

  })

  it('should render error items if the login information is incorrect', () =>{

  })
});
