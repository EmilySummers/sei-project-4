import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
// import { headers } from '../../lib/headers'

class OpenTripIndex extends React.Component {
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
      const openTrips = res.data.filter(trip => {
        if (trip.open_trip && trip.owner.id !== Auth.getUser()) {
          return trip
        }
      })
      const tripsNotAttending = openTrips.filter(trip => {
        let singleTrip = ''
        const attending = trip.attendees.filter(attendee => {
          if (attendee.id === Auth.getUser()) {
            singleTrip = 'attending'
          }
        })
        if (singleTrip !== 'attending') {
          return trip
        }
      })
      tripsNotAttending.filter(trip => {
        if (new Date(trip.end_date) < today) {
          past_trips.push(trip)
        } else {
          upcoming_trips.push(trip)
        }
      })
    this.setState({ upcoming_trips, past_trips })
  } catch(err) {
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
    <>
      <h2 className="title">Upcoming Trips</h2>
      {upcoming_trips.map(trip => (
        <div className="box" key={trip.id}>
          <Link to={`/trips/${trip.id}`}>
            <div className="media">
              {trip.photos[0] ? <img src={trip.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />}
              <div className="info">
                <h2 className="title">{trip.destination}</h2>
                <h4>{this.formatDate(new Date(trip.start_date))} - {this.formatDate(new Date(trip.end_date))}</h4>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <h2 className="title">Past Trips</h2>
      {past_trips.map(trip => (
        <div className="box" key={trip.id}>
          <Link to={`/trips/${trip.id}`}>
            <div className="media">
              {trip.photos[0] ? <img src={trip.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />}
              <div className="info">
                <h2 className="title">{trip.destination}</h2>
                <h4>{this.formatDate(new Date(trip.start_date))} - {this.formatDate(new Date(trip.end_date))}</h4>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  )
}
}

export default OpenTripIndex