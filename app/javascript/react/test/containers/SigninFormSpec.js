import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import SigninForm from '../../src/containers/SigninForm'
import FormField from '../../src/components/FormField'

describe('SigninForm', () => {
  let wrapper,
      exampleUser = 'exampleUser',
      newError = { login: "Invalid Login"}

  beforeEach(() => {
    spyOn(SigninForm.prototype, 'handleChange').and.callThrough()
    spyOn(SigninForm.prototype, 'handleSubmit')
    wrapper = mount(
      <SigninForm />
    )
  })

  it('should render a form', () => {
    expect(wrapper.find('form')).toHaveProp('id', 'login');
    expect(wrapper.find(FormField)).toBePresent();
    expect(wrapper.find('h4')).toHaveText('Sign In')
    expect(wrapper.find('#sign-in-submit')).toHaveClassName('button');
    expect(wrapper.find('#sign-in-submit')).toHaveValue('Submit');
  });

  it('should call the handleChange function when the form fields are changed', () => {
    wrapper.find('input').at(0).simulate('change', {target: {value: 'example'}})
    expect(SigninForm.prototype.handleChange).toHaveBeenCalled()
  })

  it('should call the handleSubmit function when the submit button is clicked', () => {
    wrapper.find('form').simulate('submit')
    expect(SigninForm.prototype.handleSubmit).toHaveBeenCalled()
  })

  it('should not return any error items initally', () => {
    expect(wrapper.find('.alert')).not.toBePresent()
  })

  it('should render error items if the login information is incorrect', () =>{
    wrapper.setState({ errors: newError })
    expect(wrapper.find('.alert')).toHaveText('Invalid Login')
  })
});
