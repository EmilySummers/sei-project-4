import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class TripIndex extends React.Component {
  state = {
    trips: []
  }

  async getData() {
    try {
      const res = await axios.get('/api/trips')
      const ownedTrips = res.data.filter(trip => {
        return trip.owner.id === Auth.getUser()
      })
      this.setState({ trips: ownedTrips })
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
    return (
      <>
        {this.state.trips.map(trip => (
          <Link to={`/trips/${trip.id}`} key={trip.id}>
            <div className="box">
              <div className="media">
                {trip.photos[0] ? <img src={trip.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />}
                <div className="info">
                  <h2 className="title">{trip.destination}</h2>
                  <h4>{this.formatDate(new Date(trip.start_date))} - {this.formatDate(new Date(trip.end_date))}</h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </>
    )
  }
}

export default TripIndex