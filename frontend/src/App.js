import React from 'react'
import './styles/main.scss'
import 'bulma'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProfileEdit from './components/auth/ProfileEdit'
import Profile from './components/auth/Profile'
import TripShow from './components/trips/TripShow'
import TripIndex from './components/trips/TripIndex'
import TripNew from './components/trips/TripNew'

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Notifications />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile/edit" component={ProfileEdit} />
          <Route path="/profile" component={Profile} />
          <Route path="/trips/new" component={TripNew} />
          <Route path="/trips/:id" component={TripShow} />
          <Route path="/trips" component={TripIndex} />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App