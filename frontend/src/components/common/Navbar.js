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
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item has-text-white" to="/">
              <h1>ROAM</h1>
            </Link>
            <p
              className={`navbar-burger has-text-white ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </p>
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/mytrips">My Trips</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/trips/new">Add a Trip</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/trips">Explore</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/notifications">Notifications</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/profile">My Profile</Link>}
              {Auth.isAuthenticated() && <a href="/" className="navbar-item has-text-white" onClick={this.handleLogout}>LOGOUT</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

//! add is-fixed-top to navbar

export default withRouter(Navbar)