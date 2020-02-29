import React from 'react'
import ImageUpload from '../ImageUpload'
import axios from 'axios'

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
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    console.log(this.state.data)
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
                    <input className="input" onChange={this.handleChange} placeholder="Name" name="username"></input>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input" onChange={this.handleChange} placeholder="Email" name="email"></input>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="control">
                    <input className="input" onChange={this.handleChange} placeholder="Password" type="password" name="password"></input>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input" onChange={this.handleChange} placeholder="Confirm Password" type="password" name="password_confirmation"></input>
                  </div>
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