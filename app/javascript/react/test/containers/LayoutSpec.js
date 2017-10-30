import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import Layout from '../../src/containers/Layout'

describe('Layout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Layout />
    )
  })

  it('should return true', () => {
    expect(true).toEqual(true);
  });
});
