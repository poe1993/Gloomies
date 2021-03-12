import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export function Signup() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    const apiResponse = await response.json()

    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  return (
    <div>
      <h5>Sign Up</h5>
      <hr />
      <form onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <hr />
        <div>
          <input
            type="username"
            id="inputName"
            className="form-control"
            name="username"
            placeholder="User Name"
            required
            autoFocus
            value={newUser.username}
            onChange={handleStringFieldChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            autoFocus
            value={newUser.password}
            onChange={handleStringFieldChange}
          />
        </div>
        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            name="email"
            required
            autoFocus
            value={newUser.email}
            onChange={handleStringFieldChange}
          />
        </div>
        <button type="submit">Sign Up!</button>
      </form>
    </div>
  )
}
