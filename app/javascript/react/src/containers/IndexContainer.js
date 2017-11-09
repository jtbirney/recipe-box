import React, { Component } from 'react'
import { Link } from 'react-router';
import SearchField from './SearchField'
import RecipeTileContainer from './RecipeTileContainer'

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      searchQuery: {
        recipesearch: '',
        ingredients: null,
        balanced: false,
        lowFat: false,
        peanutFree: false,
        sugarConscious: false,
        vegetarian: false,
        lowCarb: false,
        treeNutFree: false,
        alcoholFree: false,
        vegan: false,
        highProtein: false
      },
      recipes: [],
      username: "",
      userId: 0,
      search: false
    }
    this.updateRecipes = this.updateRecipes.bind(this)
    this.handleShowSearchClick = this.handleShowSearchClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.createUrl = this.createUrl.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.showMore = this.showMore.bind(this)
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
  }

  updateRecipes(updatedRecipe, method) {
    let newRecipes = this.state.recipes
    let index
    newRecipes.forEach(recipe => {
      if (recipe.id === updatedRecipe.id) {
        index = newRecipes.indexOf(recipe)
      }
    })
    if(method === "addRecipes") {
      newRecipes[index].saved = true
    } else if (method === "removeRecipes") {
      newRecipes[index].saved = false
      newRecipes[index].menu = false
    } else if (method === "addMenu") {
      newRecipes[index].saved = true
      newRecipes[index].menu = true
    } else if (method === "removeMenu") {
      newRecipes[index].menu = false
    }
    this.setState({ recipes: newRecipes })
  }

  handleShowSearchClick(event) {
    event.preventDefault()
    this.setState({ search: true })
  }

  handleSearchChange(event) {
    let name = event.target.name
    let value
    if (event.target.type === 'checkbox') {
      value = event.target.checked
    } else {
      value = event.target.value
    }
    let newQuery = this.state.searchQuery
    newQuery[name] = value
    this.setState({ searchQuery: newQuery })
  }

  createUrl() {
    let url = `/api/v1/search/?query=${this.state.searchQuery.recipesearch}`
    let query = this.state.searchQuery
    for (var key in query) {
      if (key !== "recipesearch") {
        if (query[key]) {
          url += `&${key}=${query[key]}`
        }
      }
    }
    return url
  }

  handleSearchClick(event) {
    event.preventDefault()
    let url = this.createUrl()
    fetch(url, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(body => {
        if (body.length > 0) {
          this.setState({
            recipes: body,
            search: false,
            error: ''
          })
        } else {
          this.setState({ error: "We couldn't find any recipes meeting your search criteria. Try changing your search parameters" })
        }
      })
  }

  showMore(event) {
    event.preventDefault()
    let url = this.createUrl()
    url += `&from=${this.state.recipes.length}`
    fetch(url, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(body => {
        let newRecipes = this.state.recipes.concat(body)
        this.setState({ recipes: newRecipes })
      })
  }

  fetchCurrentUser() {
    fetch(`/api/v1/users`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        if (response.name) {
          this.setState({
            username: response.name,
            userId: response.id
          })
        } else {
          this.setState({
            username: "",
            userId: 0
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCurrentUser()
  }

  componentDidMount() {
    this.fetchCurrentUser()
  }

  render() {
    return(
      <div>
        <div className="grid-x grid-margin-x">
          <div className="small-12 cell text-center">
            <a className="button large expanded" id="search-button" onClick={this.handleShowSearchClick}>Find New Recipes</a>
          </div>
        </div>
        <div className="grid-x">
          {this.state.error !== '' &&
            <div className="small-12 cell text-center">
              <div className="callout alert">
                <h4>{this.state.error}</h4>
              </div>
            </div>
          }
          {this.state.search &&
            <SearchField
              value={this.state.searchQuery.recipesearch}
              checkboxes={this.state.searchQuery}
              handleSearchChange={this.handleSearchChange}
              handleSearchSubmit={this.handleSearchClick}
            />
          }
        </div>
          <RecipeTileContainer
            userId={this.state.userId}
            recipes={this.state.recipes}
            updateRecipes={this.updateRecipes}
          />
          {this.state.recipes.length > 0 &&
          <div className="grid-x grid-margin-x">
            <div className="small-6 small-offset-3 medium-4 medium-offset-4 cell text-center">
              <a className="button large expanded" id="show-more" onClick={this.showMore}>Show More</a>
            </div>
          </div>
          }
        <div id="edamam-badge" data-color="dark"></div>
      </div>
    )
  }
}

export default IndexContainer
