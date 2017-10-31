import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import SigninForm from '../../src/containers/SigninForm'
import FormField from '../../src/components/FormField'

describe('SigninForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <SigninForm />
    )
  })

  it('should render a form with a dropdown pane', () => {
    expect(wrapper.find('form')).toHaveClassName('dropdown-pane');
    expect(wrapper.find(FormField)).toBePresent();
    expect(wrapper.find('#sign-in-submit')).toHaveClassName('button');
    expect(wrapper.find('#sign-in-submit')).toHaveValue('Submit');
  });

});
