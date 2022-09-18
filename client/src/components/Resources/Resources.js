import React, { Component } from 'react'
import DocumentTags from '../../repository/DocumentTags'

class Resources extends Component {
  state = {
    resources: [],
    filter: '',
    current: null
  }

  componentDidMount () {
    DocumentTags.loadResources().then(result => {
      this.setState({
        resources: result.data.sort()
      })
    })
  }

  render () {
    const displayResources = this.state.resources
      .filter(r => r.indexOf(this.state.filter) >= 0)
      .map((r) => (<li key={r}>
        <button className='btn btn-link btn-xs' onClick={() => this.setState({ current: r })}>{r}</button>
                   </li>))
    return (
      <div className='row mt-5'>
        <div className='col-3'>
          <div className='col-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Filter models'
              onChange={e => this.setState({ filter: e.target.value })}
            />
          </div>
          <ul className='list-unstyled components'>
            <h4>Fine tuned Models</h4>
            {displayResources}
          </ul>
        </div>
        {this.displayDetails()}
      </div>
    )
  }

  displayDetails = () => {
    if (!this.state.current) {
      return null
    }
    return (
      <div className='col-9'>
        <h3>Model: {this.state.current}</h3>
        <div className='row'>
          <div className='col-7'>
            <h4>Test results:</h4>
            <iframe style={{ height: '700px', width: '500px' }} src={`uploads/${this.state.current}.txt`} />
          </div>
          <div className='col-5'>
            <h4>Training and Testing Loss:</h4>
            <img style={{ width: '100%' }} src={`uploads/${this.state.current}.png`} />
          </div>
        </div>
      </div>
    )
  }
}

export default Resources
