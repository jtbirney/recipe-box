import React, { Component } from 'react'
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'
import SearchField from './SearchField'

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
    this.handleShowSearchClick = this.handleShowSearchClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.createUrl = this.createUrl.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.showMore = this.showMore.bind(this)
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
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
    let url = `/api/v1/recipes/?query=${this.state.searchQuery.recipesearch}`
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
        if (body.recipes.length > 0) {
          this.setState({
            recipes: body.recipes,
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
        let newRecipes = this.state.recipes.concat(body.recipes)
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
        if (response.user !== null) {
          this.setState({
            username: response.user,
            userId: response.user_id
          })
        } else {
          this.setState({
            username: "",
            userId: 0
          })
        }
      })
  }

  saveRecipe(recipe) {
    let formPayloadJSON = JSON.stringify(recipe)
    fetch('/api/v1/recipes', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: formPayloadJSON
    }).then(response => response.json())
      .then(response => {
      })
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCurrentUser()
  }

  componentDidMount() {
    this.fetchCurrentUser()
  }

  render() {
    let recipes = this.state.recipes.map(recipe => {
      let bookmark = () => this.saveRecipe(recipe);
      return(
        <RecipeTile
          key={recipe.url}
          recipe={recipe}
          user={this.state.userId}
          bookmark={bookmark}
          icon="fa-plus-circle"
        />
      )
    })

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
        <div className="grid-x grid-margin-x">
          {recipes}
          {this.state.recipes.length > 0 &&
            <div className="small-6 medium-4 cell text-center">
              <a className="button large" id="show-more" onClick={this.showMore}>More</a>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default IndexContainer
