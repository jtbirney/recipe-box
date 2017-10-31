import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import RecipeTile from '../../src/components/RecipeTile'

describe('RecipeTile', () => {
  let wrapper;
  let recipe = {
    url: "website.com",
    image: "animagewebiste.com",
    name: "Chicken Soup",
    title: "Chicken Soup"
  }

  beforeEach(() => {
    wrapper = mount(
      <RecipeTile
        recipe={recipe}
      />
    )
  })

  it('should render an a tag with link to the url', () => {
    expect(wrapper.find('a')).toHaveProp('href', 'website.com');
  });

  it('should render an image tag showing the image and alt text', () => {
    expect(wrapper.find('img')).toHaveProp('src', 'animagewebiste.com');
    expect(wrapper.find('img')).toHaveProp('alt', 'Chicken Soup');
  });

  it('should render an h4 tag with the recipe title', () => {
    expect(wrapper.find('h4')).toHaveText('Chicken Soup');
  });
});
