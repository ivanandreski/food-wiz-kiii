import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Validators from './Validators'

const SignUpModal = ({ setShowSignup, signup }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const [emailValid, setEmailValid] = useState({
    class: 'form-control w-100',
    message: '',
    messageClass: 'valid-feedback'
  })

  const [passwordValid, setPasswordValid] = useState({
    class: 'form-control w-100',
    message: '',
    messageClass: 'valid-feedback'
  })

  const handleSubmit = () => {
    const eValid = emailValidation()
    const pValid = passwordValidation()
    if (eValid && pValid) {
      signup(email, password, fullName)
    }
  }

  const emailValidation = () => {
    const result = Validators.emailValid(email)
    if (result.valid) {
      setEmailValid({
        class: 'form-control w-100 is-valid',
        message: '',
        messageClass: 'valid-feedback'
      })
      return true
    } else {
      setEmailValid({
        class: 'form-control w-100 is-invalid',
        message: result.message,
        messageClass: 'invalid-feedback'
      })
      return false
    }
  }

  const passwordValidation = () => {
    const result = Validators.passwordValid(password, confirmPassword)
    if (result.valid) {
      setPasswordValid({
        class: 'form-control w-100 is-valid',
        message: '',
        messageClass: 'valid-feedback'
      })
      return true
    } else {
      setPasswordValid({
        class: 'form-control w-100 is-invalid',
        message: result.message,
        messageClass: 'invalid-feedback'
      })
      return false
    }
  }

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
                className={emailValid.class}
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={emailValid.messageClass}>{email.message}</div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group w-100'>
              <span>Full Name:</span>
              <input
                type='text'
                className='form-control'
                value={fullName}
                placeholder='Full Name'
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group w-100'>
              <span>Password:</span>
              <input
                type='password'
                className={passwordValid.class}
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group w-100'>
              <span>Confirm Password:</span>
              <input
                type='password'
                className={passwordValid.class}
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className={password.messageClass}>{password.message}</div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => setShowSignup(false)}>
          Cancel
        </Button>
        <button
          className='btn btn-success'
          onClick={() => handleSubmit(email, password, fullName)}
        >
          Sign Up
        </button>
      </Modal.Footer>
    </>
  )
}

export default SignUpModal
