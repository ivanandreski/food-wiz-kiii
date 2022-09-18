import React, { Component } from 'react'
import Ner from '../Ner/Ner'
import Recipes from '../Recipes/Recipes'
import DocumentTags from '../../repository/DocumentTags'

class RecipesContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipes: [],
      curated: true
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    let tags = null
    if (this.state.selectedRecipe) {
      tags = (<Ner recipeId={this.state.selectedRecipe} />)
    }
    return (
      <div className='row mt-3 ml-3 mr-3'>
        <div id='sidebar ' className='col-md-2 nav nav-dark'>
          <Recipes
            recipes={this.state.recipes}
            onRecipe={(r) => this.displayRecipe(r)}
            toggleCurrated={this.toggleCurated}
            currated={this.state.curated}
          />
        </div>

        <div className='col-md-9 '>
          {tags}
        </div>
      </div>
    )
  }

  fetchData = () => {
    DocumentTags.loadRecipes().then((response) => {
      this.setState({
        recipes: response.data
      })
    })
  }

  toggleCurated = () => {
    if (!this.state.curated) {
      this.setState({ curated: true })
      DocumentTags.loadRecipes().then(res => this.setState({ recipes: res.data }))
    } else {
      this.setState({ curated: false })
      DocumentTags.loadUncurated().then(res => this.setState({ recipes: res.data }))
    }
  }

  displayRecipe = (recipeId) => {
    this.setState({
      selectedRecipe: recipeId
    })
  }
}

export default RecipesContainer
