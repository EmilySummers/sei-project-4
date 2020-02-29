import React from 'react'
import ImageUpload from '../ImageUpload'
import axios from 'axios'
import { notify } from 'react-notify-toast'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      image: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/register', this.state.data)
      notify.show(res.data.message, 'success', 3000)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    console.log(this.state.errors)
    return (
      <section className="register-page">
        <div className="register-container">
          <img src="https://res.cloudinary.com/dqrkw1z1a/image/upload/v1582827468/ROAM/unnamed_egl5dq.jpg" alt="city-break" />
          <form className="register-form" onSubmit={this.handleSubmit}>
            <h1 className="title">Register</h1>
            {/* <div className="field">
            <label className="label">
              <div className="control">
                <input className="input"></input>
              </div>
            </label>
          </div> */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <input
                      className={this.state.errors.username ? 'input is-danger' : 'input'}
                      onChange={this.handleChange}
                      placeholder="Username"
                      name="username"
                    />
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                    className={this.state.errors.email ? 'input is-danger' : 'input'}
                    onChange={this.handleChange}
                    placeholder="Email"
                    name="email" />
                  </div>
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
              </div>
              <div className="column">
                <div className="field">
                  <div className="control">
                    <input
                    className={this.state.errors.password ? 'input is-danger' : 'input'}
                    onChange={this.handleChange}
                    placeholder="Password"
                    type="password"
                    name="password" />
                  </div>
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                    className={this.state.errors.password_confirmation ? 'input is-danger' : 'input'}
                    onChange={this.handleChange}
                    placeholder="Confirm Password"
                    type="password"
                    name="password_confirmation" />
                  </div>
                  {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
                </div>
              </div>
            </div>
            <ImageUpload
              handleChange={this.handleChange}
              fieldName="image"
              displayImgUp={true}
            />
            <button className="button is-info">Start Roaming</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Register