import React from 'react'
import './styles/main.scss'
import 'bulma'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import TripShow from './components/trips/TripShow'
import TripIndex from './components/trips/TripIndex'
import TripNew from './components/trips/TripNew'

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/trips/new" component={TripNew} />
          <Route path="/trips/:id" component={TripShow} />
          <Route path="/trips" component={TripIndex} />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App