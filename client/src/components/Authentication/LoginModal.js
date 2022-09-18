import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LoginModal = ({ setShowLogin, login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row'>
            <div className='form-group w-100'>
              <span>Email:</span>
              <input
                type='email'
                className='form-control'
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group w-100'>
              <span>Password:</span>
              <input
                type='password'
                className='form-control'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => setShowLogin(false)}>
          Cancel
        </Button>
        <button
          className='btn btn-success'
          onClick={() => login(email, password)}
        >
          Log in
        </button>
      </Modal.Footer>
    </>
  )
}

export default LoginModal
