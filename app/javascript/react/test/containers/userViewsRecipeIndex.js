import RecipeContainer from '../../src/containers/RecipeContainer';
import RecipeTile from '../../src/components/RecipeTile';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';

describe('RecipeContainer', () => {
  let wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(<RecipeContainer />);
  });

  it('should return true', () => {
    expect(true).toEqual(true);
  });
});
