import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './custom.scss'
import { SignIn } from './SignIn'

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
    </Switch>
  )
}
