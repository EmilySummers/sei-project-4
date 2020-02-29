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
import MyTripShow from './components/trips/MyTripShow'
import MyTripIndex from './components/trips/MyTripIndex'
import TripNew from './components/trips/TripNew'
import OpenTripIndex from './components/trips/OpenTripIndex'
import OpenTripShow from './components/trips/OpenTripShow'

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
          <Route path="/trips/:id" component={OpenTripShow} />
          <Route path="/trips/new" component={TripNew} />
          <Route path="/trips" component={OpenTripIndex} />
          <Route path="/mytrips/:id" component={MyTripShow} />
          <Route path="/mytrips" component={MyTripIndex} />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App