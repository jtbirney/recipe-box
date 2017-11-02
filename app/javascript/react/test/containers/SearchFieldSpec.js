import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import SearchField from '../../src/containers/SearchField'

describe('SearchField', () => {
  let wrapper

  beforeEach(() => {
    spyOn(SearchField.prototype, 'showFilters').and.callThrough()
    wrapper = mount(
      <SearchField/>
    )
  })

  it('should render the search field, search submit button, and filters button, but not the filter box components', () => {

  })

  it('should invoke the showFilters method when the filter button is clicked and show the filterBox component', () => {
    
  })
})
