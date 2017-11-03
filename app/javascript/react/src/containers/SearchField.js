import React, { Component } from 'react'
import FilterBox from '../components/FilterBox'

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: false
    }
    this.showFilters = this.showFilters.bind(this)
  }

  showFilters(event) {
    event.preventDefault()
    this.setState({ filters: !this.state.filters })
  }

  render() {
    return(
      <form className="small-10 small-offset-1" onSubmit={this.props.handleSearchSubmit}>
        <div className="grid-x">
          <input className="auto cell"
            type="search"
            id="recipesearch"
            name="recipesearch"
            placeholder="Search"
            value={this.props.value}
            onChange={this.props.handleSearchChange}
          />
          <input type="submit" className="button large shrink cell" value="Search" />
          <a className="button large shrink cell" onClick={this.showFilters}>Filter</a>
        </div>
        { this.state.filters &&
          <FilterBox
            ingredients={this.props.checkboxes.ingredients}
            checkboxes={this.props.checkboxes}
            handleChange={this.props.handleSearchChange}
          />
        }
      </form>
    )
  }
}

export default SearchField
