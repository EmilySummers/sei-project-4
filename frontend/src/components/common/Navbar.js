import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  state ={

  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav className="navbar is-transparent is-light">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <h1>ROAM</h1>
            </Link>
          </div>
          {/* <Link className="navbar-item" to="/"></Link> */}
          <div className="navbar-end">
            <Link className="navbar-item" to="/trips">My Trips</Link>
            <Link className="navbar-item" to="/trips/new">Create Trip</Link>
            <Link className="navbar-item" to="/register">Register</Link>
            <Link className="navbar-item" to="/login">Login</Link>
            <a href="/" className="navbar-item" onClick={this.handleLogout}>LOGOUT</a>
          </div>
        </div>
      </nav>
    )
  }
}

//! add is-fixed-top to navbar

export default withRouter(Navbar)