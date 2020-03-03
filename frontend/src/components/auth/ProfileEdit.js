import React from 'react'
import ImageUpload from '../ImageUpload'
import axios from 'axios'
import Auth from '../../lib/auth'

class ProfileEdit extends React.Component {
  state = {
    data: {
      id: null,
      username: '',
      email: '',
      image: '',
      trips: []
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
    const userId = this.state.data.id
    try {
      await axios.put(`/api/${userId}/`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/profile')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
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
                    value={this.state.data.username || ''}
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
                    name="email"
                    value={this.state.data.email || ''} />
                </div>
              </div>
              {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
            </div>
          </div>
          <ImageUpload
            handleChange={this.handleChange}
            fieldName="image"
            displayImgUp={true}
          />
          <button className="button is-info">Save changes</button>
        </form>
      </section>
    )
  }
}

export default ProfileEdit