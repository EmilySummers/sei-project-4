import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
// import { headers } from '../../lib/headers'

class MyTripIndex extends React.Component {
  state = {
    upcoming_trips: [],
    past_trips: []
  }

  async getData() {
    const upcoming_trips = []
    const past_trips = []
    const today = new Date()
    try {
      const res = await axios.get('/api/trips', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const ownedTrips = res.data.filter(trip => {
        return trip.owner.id === Auth.getUser()
      })
      const attendingTrips = res.data.filter(trip => {
        const attending = trip.attendees.filter(attendee => {
          return attendee.id === Auth.getUser()
        })
        return attending.length > 0
      })
      const myTrips = [...ownedTrips, ...attendingTrips]
      myTrips.filter(trip => {
        if (new Date(trip.end_date) < today) {
          past_trips.push(trip)
        } else {
          upcoming_trips.push(trip)
        }
      })
      this.setState({ upcoming_trips, past_trips })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async trip => {
    try {
      await axios.delete(`/api/trips/${trip.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ]
    var day = date.getDate()
    var monthIndex = date.getMonth()
    var year = date.getFullYear()
    return day + ' ' + monthNames[monthIndex] + ' ' + year
  }

  render() {
    const { upcoming_trips, past_trips } = this.state
    return (
      <div className="hero index-hero">
        <div className="index-container">
          <div className="add-button-container">
            <Link to="/trips/new">
              <button className="add-button"></button>
            </Link>
          </div>
          <div>
            <h2 className="trip-header">Upcoming Trips</h2>
            <div className="boxes">
              {upcoming_trips.map(trip => (
                <div className="box" key={trip.id}>
                  <Link to={`/mytrips/${trip.id}`}>
                    <div className="media">
                      {trip.photos[0] ? <img src={trip.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />}
                      <div className="info">
                        <h2 className="dest-header">{trip.destination}</h2>
                        <h4>{this.formatDate(new Date(trip.start_date))} - {this.formatDate(new Date(trip.end_date))}</h4>
                      </div>
                    </div>
                  </Link>
                  <button className="delete-button button" onClick={() => this.handleDelete(trip)}>Delete trip</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="trip-header">Past Trips</h2>
            <div className="boxes">
              {past_trips.map(trip => (
                <div className="box" key={trip.id}>
                  <Link to={`/mytrips/${trip.id}`}>
                    <div className="media">
                      {trip.photos[0] ? <img src={trip.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />}
                      <div className="info">
                        <h2 className="dest-header">{trip.destination}</h2>
                        <h4>{this.formatDate(new Date(trip.start_date))} - {this.formatDate(new Date(trip.end_date))}</h4>
                      </div>
                    </div>
                  </Link>
                  <button className="delete-button button" onClick={() => this.handleDelete(trip)}>Delete trip</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTripIndex