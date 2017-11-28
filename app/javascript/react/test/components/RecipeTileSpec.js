import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import RecipeTile from '../../src/components/RecipeTile'

describe('RecipeTile', () => {
  let wrapper;
  let recipe = {
    id: 1,
    url: "website.com",
    image: "animagewebiste.com",
    name: "Chicken Soup",
    title: "Chicken Soup",
    saved: false,
    menu: false
  }

  beforeEach(() => {
    wrapper = mount(
      <RecipeTile
        recipe={recipe}
        user={0}
        recipestext="Recipes"
        menuText="Menu"
      />
    )
  })

  // it('should render an a tag with link to the url', () => {
  //   expect(wrapper.find('a')).toHaveProp('href', '/recipes/1');
  // });

  it('should render an image tag showing the image and alt text', () => {
    expect(wrapper.find('img')).toHaveProp('src', 'animagewebiste.com');
    expect(wrapper.find('img')).toHaveProp('alt', 'Chicken Soup');
  });

  it('should render an h4 tag with the recipe title', () => {
    expect(wrapper.find('h4')).toHaveText('Chicken Soup');
  })

  it('should not render an add icon for recipes or menu ', () => {
    expect(wrapper.find('i')).not.toBePresent()
    expect(wrapper.find('.button')).not.toBePresent()
  })

  it('should render an add icon for recipes and menu if the user is logged in', () => {
    wrapper.setProps({ user: 1 });
    expect(wrapper.find('i').first()).toHaveClassName('fa-plus')
    expect(wrapper.find('i').at(1)).toHaveClassName('fa-plus')
    expect(wrapper.find('.button').first()).toHaveText('Recipes')
    expect(wrapper.find('.button').at(1)).toHaveText('Menu')
  })

  // it('should render an minus icon for recipes and add icon for menu if the user is logged in and has the recipe saved', () => {
  //   recipe.saved = true
  //   wrapper.setProps({
  //     user: 1,
  //     recipe: handleDeleteRecipes
  //   });
  //   expect(wrapper.find('i').first()).toHaveClassName('fa-plus')
  //   expect(wrapper.find('i').at(1)).toHaveClassName('fa-plus')
  //   expect(wrapper.find('.button').first()).toHaveText('Recipes')
  //   expect(wrapper.find('.button').at(1)).toHaveText('Menu')
  // })
});
