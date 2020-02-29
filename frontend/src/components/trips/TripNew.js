import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class TripNew extends React.Component {
  state = {
    data: {
      destination: '',
      start_date: '',
      end_date: ''
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
      const res = await axios.post('/api/trips/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/trips/${res.data.id}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    console.log(this.state.errors)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 className="title">Add a Trip</h2>
          <div className="field">
            <div className="control">
              <input className="input" onChange={this.handleChange} placeholder="Where are you going?" name="destination"></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" onChange={this.handleChange} placeholder="From" name="start_date" type="date"></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
              className={this.state.errors.message ? 'input is-danger' : 'input'}
              onChange={this.handleChange}
              placeholder="To"
              name="end_date"
              type="date" />
            </div>
            {this.state.errors.message && <small className="help is-danger">{this.state.errors.message}</small>}
          </div>
          <button className="button">Add Trip</button>
        </form>
      </div>
    )
  }
}

export default TripNew