import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class MyNotifications extends React.Component {
  state = {
    tripData: { 
      trips: [],
      trip_shares: []
    }
  }

  getTripData = async () => {
    const userId = Auth.getUser()
    try {
      const { data } = await axios.get(`/api/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const filteredIds = data.trips.map(trip => {
        return trip.id
      })
      this.setState({ tripData: { trips: [ ...filteredIds ], trip_shares: data.trip_shares } })
    } catch (err) {
      console.log(err)
      // this.props.history.push('/notfound')
    }
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

  componentDidMount() {
    this.getTripData()
  }

  joinTrip = (tripId) => {
    const newTripShares = this.state.tripData.trip_shares.filter(trip_share => {
      return trip_share.id !== tripId
    })
    const filteredIds = newTripShares.map(trip => {
      return trip.id
    })
    this.setState({ tripData: { trips: [ ...this.state.tripData.trips, tripId ], trip_shares: filteredIds } }, () => {
      this.assignTrip()
    })
  }

  assignTrip = async() => {
    const userId = Auth.getUser()
    console.log(this.state.tripData)
    try {
      await axios.put(`/api/${userId}/`, this.state.tripData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/mytrips')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    return (
      <>
        <h1>Notifications</h1>
        {this.state.tripData.trip_shares.map((trip_share, i) => (
          <div key={i}>
            {/* {trip_share.photos[0] ? <img src={trip_share.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />} */}
            <p>You have been invited to join a trip to {trip_share.destination} on {this.formatDate(new Date(trip_share.start_date))}</p>
            <button onClick={() => this.joinTrip(trip_share.id)}>Join Trip</button>
          </div>
        ))}

      </>
    )
  }
}

export default MyNotifications