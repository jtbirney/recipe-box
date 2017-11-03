import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import SignupForm from '../../src/containers/SignupForm'
import FormField from '../../src/components/FormField'

describe('SignupForm', () => {
  let wrapper,
      username = "user1",
      newError = { signUp: 'Name cannot be blank'};

  beforeEach(() => {
    spyOn(SignupForm.prototype, 'handleChange').and.callThrough()
    spyOn(SignupForm.prototype, 'validateFields').and.callThrough()
    spyOn(SignupForm.prototype, 'handleSubmit')
    wrapper = mount(
      <SignupForm />
    )
  })

  it('should render a form with a dropdown pane', () => {
    expect(wrapper.find('form')).toBePresent();
    expect(wrapper.find(FormField)).toBePresent();
    expect(wrapper.find('#sign-up-submit')).toHaveClassName('button');
    expect(wrapper.find('#sign-up-submit')).toHaveValue('Submit');
  });

  it('handleChange and validateFields should be invoked when the input is changed', () => {
    wrapper.find('input').first().simulate('change', {target: {value: username }});
    expect(SignupForm.prototype.handleChange).toHaveBeenCalled()
    expect(SignupForm.prototype.validateFields).toHaveBeenCalled()
  })

  it('should be invoked when the input is changed', () => {
    wrapper.find('form').simulate('submit');
    expect(SignupForm.prototype.handleSubmit).toHaveBeenCalled()
  })

  it('should not render error items initially', () => {
    expect(wrapper.find('.alert')).not.toBePresent()
  })

  it('should render error items when fields are completed with invalid information', () => {
    wrapper.setState({ errors: newError })
    expect(wrapper.find('.alert')).toHaveText('Name cannot be blank')
  })
});
