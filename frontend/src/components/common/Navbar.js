import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  state = { navOpen: false }

  toggleNavbar = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar is-transparent is-light">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <h1>ROAM</h1>
            </Link>
            <p
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </p>
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/trips">My Trips</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/trips/new">Add a Trip</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">My Profile</Link>}
              {Auth.isAuthenticated() && <a href="/" className="navbar-item" onClick={this.handleLogout}>LOGOUT</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

//! add is-fixed-top to navbar

export default withRouter(Navbar)