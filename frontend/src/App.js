import React from 'react'
import './styles/main.scss'
import 'bulma'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App