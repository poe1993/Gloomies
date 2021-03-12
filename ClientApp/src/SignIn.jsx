import React, { useState } from 'react'
import { recordAuthentication } from './auth'

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleSignUpLink() {
    window.location.assign('/signup')
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...user, [fieldName]: value }
    setUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    console.log('ok')
    event.preventDefault()
    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      console.log(apiResponse)
      recordAuthentication(apiResponse)
      window.location.assign('/home')
    }
  }

  return (
    <div>
      <h5>Sign In</h5>
      <form onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="form-label-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            name="email"
            value={user.email}
            onChange={handleStringFieldChange}
          />
        </div>

        <div className="form-label-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            name="password"
            value={user.password}
            onChange={handleStringFieldChange}
          />
        </div>
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
        >
          Log In
        </button>
        <hr className="my-4" />

        <button
          className="btn btn-lg btn-google btn-block text-uppercase"
          type="submit"
          onClick={handleSignUpLink}
        >
          Sign Up!
        </button>
      </form>
    </div>
  )
}
