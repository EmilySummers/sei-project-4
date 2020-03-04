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
      this.props.history.push(`/mytrips/${res.data.id}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    return (
      <div className="hero add-hero">
        <div className="add-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="add-container">
              <h2 className="title">Create a Trip</h2>
              <div className="field-dest">
              <label className="label">Destination</label>
                <div className="control">
                  <input className="input"
                    onChange={this.handleChange}
                    placeholder="Where are you going?"
                    name="destination"
                  />
                </div>
              </div>
              <div className="field-date">
                <div className="control">
                <label className="label">From</label>
                  <input className="input"
                    onChange={this.handleChange}
                    name="start_date"
                    type="date"
                  />
                </div>
                <div className="control">
                <label className="label">To</label>
                  <input
                    className={this.state.errors.message ? 'input is-danger' : 'input'}
                    onChange={this.handleChange}
                    name="end_date"
                    type="date"
                  />
                </div>
              </div>
              {this.state.errors.message && <small className="help is-danger">{this.state.errors.message}</small>}
            </div>
            <div className="add-buttons">
              <button className="button edit">Create</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TripNew