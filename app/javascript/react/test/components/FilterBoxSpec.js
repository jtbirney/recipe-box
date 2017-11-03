import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import FilterBox from '../../src/components/FilterBox'

describe('FilterBox', () => {
  let wrapper,
      checkboxes = {
        recipesearch: '',
        ingredients: null,
        balanced: false,
        lowFat: false,
        peanutFree: false
      },
      ingredients = 10;

  beforeEach(() => {
    wrapper = mount(
      <FilterBox
        checkboxes={checkboxes}
        ingredients={ingredients}
      />
    )
  })

  it('should render an h5 tag with the text "Number of Ingredients"', () => {
    expect(wrapper.find('h5').first()).toHaveText('Number of Ingredients');
  });

  it('should render a select tag with the value of 10 and options no limit and 1 through 15', () => {
    expect(wrapper.find('select')).toHaveValue(10)
  })

  it('should render an h5 tag with the text "Dietary Restrictions"', () => {
    expect(wrapper.find('h5').at(1)).toHaveText('Dietary Restrictions');
  })

  it('should render checkboxes with the labels balanced, Low Fat, and Peanut Free', () => {
    expect(wrapper.find('input').at(0)).toHaveProp('type', 'checkbox')
    expect(wrapper.find('label').at(0)).toHaveText('Balanced')
    expect(wrapper.find('input').at(1)).toHaveProp('type', 'checkbox')
    expect(wrapper.find('label').at(1)).toHaveText('Low Fat')
    expect(wrapper.find('input').at(2)).toHaveProp('type', 'checkbox')
    expect(wrapper.find('label').at(2)).toHaveText('Peanut Free')
  })
})
