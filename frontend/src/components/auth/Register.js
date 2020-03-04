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
    return (
      <section className="register-page">
        <div className="register-hero">
          <div className="register-wrapper">
            <div className="register-container columns">
              <div className="column is-half-desktop">
                <img src="https://res.cloudinary.com/dqrkw1z1a/image/upload/v1583248319/ROAM/5c88d769f73f5c0a3b1d1804_copy_twtdid.jpg" alt="city-break" />
              </div>
              <div className="column is-half-desktop">
                <form className="register-form" onSubmit={this.handleSubmit}>
                  <h1 className="reg-title">Register</h1>
                  {/* <div className="field">
            <label className="label">
              <div className="control">
                <input className="input"></input>
              </div>
            </label>
          </div> */}
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
                  <div className="image-container">
                    <ImageUpload
                      handleChange={this.handleChange}
                      fieldName="image"
                      displayImgUp={true}
                      inputClassName="register-image"
                      preset="afar9d6z"
                      // labelText="Add photo"
                    />
                  </div>
                  <button className="button is-fullwidth">Start Roaming</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default Register