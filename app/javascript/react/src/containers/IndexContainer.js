import React, { Component } from 'react'
import { Link } from 'react-router';
import RecipeTile from '../components/RecipeTile'

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: '',
      recipes: [],
      username: "",
      userId: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
  }

  handleClick(event) {
    fetch(`/api/v1/recipes`)
      .then(response => response.json())
      .then(body => {
        this.setState({ recipes: body.recipes })
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
        console.log(response)
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
        console.log(response)
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
        <div>
          {this.state.recipe}
        </div>
        {this.state.userId === 0 &&
          <div className="grid-x grid-margin-x">
            <div className="small-12 cell text-center">
              <a className="button expanded" onClick={this.handleClick}>Find New Recipes</a>
            </div>
          </div>
        }
        {this.state.userId !== 0 &&
          <div className="grid-x grid-margin-x">
            <div className="small-6 cell text-center">
              <a className="button expanded" onClick={this.handleClick}>Find New Recipes</a>
            </div>
            <div className="small-6 cell text-center">
              <Link to={`/users/${this.state.userId}`} className="button expanded">My Recipes</Link>
            </div>
          </div>
        }
        <div className="grid-x grid-margin-x">
          {recipes}
        </div>
      </div>
    )
  }
}

export default IndexContainer
