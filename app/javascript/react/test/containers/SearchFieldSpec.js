import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import SearchField from '../../src/containers/SearchField'
import FilterBox from '../../src/components/FilterBox'

describe('SearchField', () => {
  let wrapper,
      sampleCheckboxes = {
        recipesearch: '',
        ingredients: null,
        balanced: false,
        lowFat: false,
        peanutFree: false
      }

  beforeEach(() => {
    spyOn(SearchField.prototype, 'showFilters').and.callThrough()
    wrapper = mount(
      <SearchField
        checkboxes={sampleCheckboxes}
      />
    )
  })

  it('should render the search field, search submit button, and filters button, but not the filter box components', () => {
    expect(wrapper.find('form')).toBePresent()
    expect(wrapper.find('#recipesearch')).toBePresent()
    expect(wrapper.find('input').at(1)).toHaveProp('value', 'Search')
    expect(wrapper.find('a')).toHaveText('Filter')
    expect(wrapper.find(FilterBox)).not.toBePresent()
  })

  it('should invoke the showFilters method when the filter button is clicked and show the filterBox component', () => {
    wrapper.find('a').simulate('click')
    expect(wrapper.find(FilterBox)).toBePresent()
  })
})
