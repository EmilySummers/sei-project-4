import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'
import Auth from '../../lib/auth'

class Login extends React.Component {
  state ={
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = e => {
    e.target.className = 'input'
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      Auth.setToken(res.data.token)
      notify.show(res.data.message, 'success', 3000)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    return (
      <section className="login-hero">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h2 className="title has-text-white has-text-centered is-2">Login</h2>
          <div className="field">
            <div className="control">
              <input
              className={this.state.error ? 'input is-danger' : 'input'}
              onChange={this.handleChange}
              placeholder="Email"
              name="email" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
              className={this.state.error ? 'input is-danger' : 'input'}
              onChange={this.handleChange}
              placeholder="Password"
              name="password"
              type="password" />
            </div>
            {this.state.error && <small className="help is-danger">{this.state.error}</small>}
          </div>
          <button className="button">Login</button>
        </form>
      </section>
    )
  }
}

export default Login