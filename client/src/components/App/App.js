import React, { Component } from 'react'
import './App.css'
import Header from '../Header/header'
import DocumentTags from '../../repository/DocumentTags'
import {
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Predict from '../Predict/Predict'
import Resources from '../Resources/Resources'
import FoodOntoMap from '../FoodOntoMap/FoodOntoMap'
import RecipesContainer from '../RecipesContainer/RecipesContainer'
import FooDis from '../FooDis/FooDis'
import Corpus from '../Corpus/Corpus'
import Datasets from '../Datasets/Datasets'
import CorpusContainer from '../CorpusContainer/CorpusContainer'
import Document from '../Document/Document'
import Upload from '../Upload/Upload'

class App extends Component {
  render () {
    const routing = (
      <HashRouter>
        <Header />
        <Switch>
          <Route path='/recipes'>
            <RecipesContainer />
          </Route>
          <Route exact path='/corpus'>
            <Corpus />
          </Route>
          <Route path='/upload'>
            <Upload />
          </Route>
          <Route path='/datasets'>
            <Datasets />
          </Route>
          <Route path='/foo-dis'>
            <FooDis loadFn={DocumentTags.loadFooDis} title='foo-dis' />
          </Route>
          <Route path='/cafeteria'>
            <FooDis loadFn={DocumentTags.loadCafeteria} title='cafeteria' />
          </Route>
          <Route path='/predict'>
            <Predict />
          </Route>
          <Route path='/result-resources'>
            <Resources />
          </Route>
          <Route path='/food-onto-map'>
            <FoodOntoMap />
          </Route>
          <Route path='/corpus/:id'>
            <CorpusContainer />
          </Route>
          <Route path='/document/:id'>
            <Document />
          </Route>
          <Redirect to='/recipes' />
        </Switch>
      </HashRouter>
    )

    return <div className='App'>{routing}</div>
  }
}

export default App
