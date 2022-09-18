import React, { useState, useEffect } from 'react'

import AuthenticationService from '../../repository/AuthenticationService'
import NotAuthenticated from './NotAuthenticated'

const Authentication = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    AuthenticationService.setAuthToken(token)
    if (token !== null) {
      AuthenticationService.getUserEmail()
        .then((response) => {
          setEmail(response.data)
          setAuthenticated(true)
        })
        .catch((e) => console.log(e))
    }
  })

  const handleLogin = (email, password) => {
    AuthenticationService.login(email, password)
      .then((response) => {
        const { token } = response.data

        sessionStorage.setItem('token', token)

        setAuthenticated(true)
        setEmail(email)
        AuthenticationService.setAuthToken(token)
      })
      .catch((error) => console.log(error))
  }

  const handleSignup = (email, password, fullName) => {
    AuthenticationService.signup(email, password, fullName)
      .then((response) => {
        // implement success or danger window

        handleLogin(email, password)
      })
      .catch((error) => console.log(error))
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setAuthenticated(false)
    setEmail('')
  }

  return authenticated
    ? (
      <>
        <span className='text-light mr-2'>Welcome: {email}</span>
        <button className='btn btn-danger' onClick={handleLogout}>
          Log out
        </button>
      </>
      )
    : (
      <>
        <NotAuthenticated handleLogin={handleLogin} handleSignup={handleSignup} />
      </>
      )
}

export default Authentication
