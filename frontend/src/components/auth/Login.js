import React from 'react'
import axios from 'axios'
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
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      Auth.setToken(res.data.token)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    return (
      <section className="login-page">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h1 className="title">Login</h1>
          <div className="field">
            <div className="control">
              <input className="input" onChange={this.handleChange} placeholder="Email" name="email"></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" onChange={this.handleChange} placeholder="Password" name="password" type="password"></input>
            </div>
          </div>
          <button className="button is-info">Login</button>
        </form>
      </section>
    )
  }
}

export default Login