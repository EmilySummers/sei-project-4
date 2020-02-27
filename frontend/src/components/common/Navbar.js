import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = () => (
  <nav className="navbar is-transparent is-light">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1>ROAM</h1>
        </Link>
      </div>
      {/* <Link className="navbar-item" to="/"></Link> */}
      <div className="navbar-end">
        <Link className="navbar-item" to="/register">Register</Link>
        <Link className="navbar-item" to="/login">Login</Link>
      </div>
    </div>
  </nav>
)

//! add is-fixed-top to navbar

export default withRouter(Navbar)