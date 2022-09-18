import React, { Component } from 'react'
import DocumentTags from '../../repository/DocumentTags'

class Auth extends Component {
  state = {
    authenticated: null,
    username: '',
    password: ''
  }

  componentDidMount () {
    this.setState({ authenticated: DocumentTags.isAuthenticated() })
  }

  render () {
    if (DocumentTags.isAuthenticated()) {
      return (
        <form className='form-inline' onSubmit={this.doLogout}>
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
          >
            Logout
          </button>
        </form>
      )
    } else {
      return (
        <form className='form-inline row ml-5' onSubmit={this.doLogin}>
          <input
            className='form-control mr-sm-2 col-4'
            type='text'
            placeholder='Username'
            aria-label='Username'
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            className='form-control mr-sm-2 col-4'
            type='password'
            placeholder='Password'
            aria-label='Password'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button
            className='btn btn-outline-success my-2 my-sm-0 col-2'
            type='submit'
          >
            Login
          </button>
        </form>
      )
    }
  }

  doLogin = (e) => {
    e.preventDefault()
    DocumentTags.login(this.state.username, this.state.password)
      .then((resp) => this.setState({ authenticated: true }))
      .catch((err) => alert('Invalid credentials! Please try again. '))
  }

  doLogout = (e) => {
    e.preventDefault()
    DocumentTags.logout()
    this.setState({ authenticated: false })
  }
}

export default Auth
