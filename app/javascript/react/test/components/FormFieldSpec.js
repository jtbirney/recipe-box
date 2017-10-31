import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import FormField from '../../src/components/FormField'

describe('FormField', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FormField
        type="text"
        name="username"
        value="user"
        label="Username"
      />
    )
  })

  it('should render an input tag with link to the url', () => {
    expect(wrapper.find('input')).toHaveValue('user');
    expect(wrapper.find('input')).toHaveProp('type', 'text');
    expect(wrapper.find('input')).toHaveProp('name', 'username');
    expect(wrapper.find('input')).toHaveProp('placeholder', 'Username');
  });
});
