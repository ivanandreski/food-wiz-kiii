import React from 'react'
import DocumentTags from '../../repository/DocumentTags'

import dsNamespaces from '../../repository/ds-namespaces'

class FoodOntoMap extends React.Component {
  // addTag(word, tag), removeTag(word), undoRemoveTag(word), updateTag(word, tag)

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      searchResults: {},
      loading: false,
      filter: ''
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    if (!this.state.data || !this.state.hansard || !this.state.foodon || !this.state.snomedct) {
      return (<h5>Loading...</h5>)
    }
    const foodOntoMap = this.state.data
    const phrasesDisplay = Object.keys(foodOntoMap)
      .filter(key => this.state.filter === '' || key.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
      .map(key => (
        <tr key={key}>
          <td onClick={() => this.doSearch(key)} className='clickable'>{key}</td>
          <td>{foodOntoMap[key].synonyms}</td>
          <td>{this.displayTags(key, 'hansard')}</td>
          <td>{this.displayTags(key, 'foodon')}</td>
          <td>{this.displayTags(key, 'snomedct')}</td>
        </tr>
      ))
    return (
      <div className='container'>
        <h5>Click on the phrase to inspect the suggestions based on the textual embedding similarity</h5>
        <div className='col-md-12'>
          <input
            type='text'
            placeholder='Filter phrase'
            className='form-control'
            value={this.state.filter}
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
        </div>
        <table className='table mt-4'>
          <thead>
            <tr>
              <th>Phrase</th>
              <th>Synonyms</th>
              <th>Hansard tags</th>
              <th>FoodOn tags</th>
              <th>SnomedCT tags</th>
            </tr>
          </thead>
          <tbody>
            {phrasesDisplay}
          </tbody>
        </table>
      </div>
    )
  }

  fetchData = () => {
    DocumentTags.foodOntoMap().then((response) => {
      this.setState({
        data: response.data
      })
    })

    DocumentTags.hansard().then(response => {
      this.setState({
        hansard: response.data
      })
    })

    DocumentTags.foodon().then(response => {
      this.setState({
        foodon: response.data
      })
    })

    DocumentTags.snomedct().then(response => {
      this.setState({
        snomedct: response.data
      })
    })
  }

  doSearch = (phrase) => {
    this.setState({
      loading: true
    })
    DocumentTags.searchIx(phrase, 5).then((response) => {
      this.setState((state) => {
        return {
          searchResults: {
            [phrase]: response.data,
            ...state.searchResults
          },
          loading: false
        }
      })
      console.log(this.state.searchResults)
    }).catch(r => {
      this.setState({
        loading: false
      })
      alert('Something went wrong. Probably a timeout. Please try again')
    })
  }

  updateStateField = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  displayTags = (key, dataset) => {
    const entity = this.state.data[key]
    const tags = entity[dataset] || []
    const dsMap = this.state[dataset]

    if (this.state.searchResults[key]) {
      const keyResults = this.state.searchResults[key] || {}
      const results = keyResults[dataset] || []

      const tp = results.filter(v => tags.includes(v[1]))
        .map(this.displayTag(dsMap, 'text-success', dataset))
      const fp = results.filter(v => !tags.includes(v[1]))
        .map(this.displayTag(dsMap, 'text-danger', dataset))
      const tn = tags.filter(v => !results.includes(v[1]))
        .map(this.displayTag(dsMap, 'text-warning', dataset))
      return (
        <>
          <div>
            <h5>True positives:</h5>
            {tp}
          </div>
          <div>
            <h5>False positives:</h5>
            {fp}
          </div>
          <div>
            <h5>True Negatives:</h5>
            {tn}
          </div>
        </>
      )
    } else {
      const tagDisplay = tags.map(t => ['', t]).map(this.displayTag(dsMap, 'text-dark', dataset))
      return tagDisplay
    }
  }

  displayTag = (dsMap, clazz, dataset) => {
    return (tag) => {
      return (
        <a key={tag[1]} target='__blank' href={dsNamespaces[dataset].url + tag[0]}>
          <p className={clazz} title={tag[1]}>{dsMap[tag[1]]}</p>
        </a>
      )
    }
  }
}

export default FoodOntoMap
