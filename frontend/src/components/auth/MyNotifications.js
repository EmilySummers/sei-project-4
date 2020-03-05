import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { notify } from 'react-notify-toast'

class MyNotifications extends React.Component {
  state = {
    tripData: {
      trips: [],
      trip_shares: [],
      trip_offers: []
    },
    offerData: {
      trips: [],
      trip_requests: []
    },
    trip_offers: {
      trip_offers: []
    },
    errors: {}
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
      this.setState({ tripData: { trips: [...filteredIds], trip_shares: data.trip_shares, trip_offers: data.trip_offers }, trip_offers: { trip_offers: data.trip_offers } })
    } catch (err) {
      console.log(err)
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
    this.setState({ tripData: { trips: [...this.state.tripData.trips, tripId], trip_shares: filteredIds } }, () => {
      this.assignTrip()
    })
  }

  getRequestData = async tripId => {
    const requestee = localStorage.getItem('requestee')
    try {
      const { data } = await axios.get(`/api/${requestee}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const filteredTripIds = data.trips.map(trip => {
        return trip.id
      })
      const filteredRequestIds = data.trip_requests.map(trip_request => {
        return trip_request.id
      })
      const removedCurrentRequest = filteredRequestIds.filter(tripRequestId => {
        return tripRequestId !== tripId
      })
      this.setState({ offerData: { trips: [...filteredTripIds, tripId], trip_requests: [...removedCurrentRequest] } }, () => {
        this.acceptOffer(tripId)
      })
    } catch (err) {
      console.log(err)
    }
  }

  acceptOffer = async tripId => {
    const requestee = localStorage.getItem('requestee')
    try {
      await axios.put(`/api/${requestee}/`, this.state.offerData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.deleteOffer(tripId)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  deleteOffer = tripId => {
    const filteredIds = this.state.trip_offers.trip_offers.map(trip_offer => {
      return trip_offer.id
    })
    const removedCurrentOffer = filteredIds.filter(tripOfferId => {
      return tripOfferId !== tripId
    })
    this.setState({ trip_offers: { trip_offers: removedCurrentOffer } }, () => {
      this.completeDelete()
    })
  }

  completeDelete = async () => {
    const ownerId = Auth.getUser()
    try {
      await axios.put(`/api/${ownerId}/`, this.state.trip_offers, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Request accepted!', 'success', 3000)
      this.getTripData()
    } catch (err) {
      console.log(err)
    }
  }

  assignTrip = async () => {
    const userId = Auth.getUser()
    try {
      await axios.put(`/api/${userId}/`, this.state.tripData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('You have been added to the trip!', 'success', 3000)
      this.props.history.push('/mytrips')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    console.log(this.state.tripData.trip_offers)
    return (
      <div className="hero profile-hero">
        <div className="note-wrapper">
          <div className="note-container">
            <h2>Notifications</h2>
            {this.state.tripData.trip_shares.length < 1 && this.state.tripData.trip_offers.length < 1
              ?
              <h3>You have no notifications</h3>
              :
              <div className="wrapper">
                {this.state.tripData.trip_shares.length > 0 &&
                  this.state.tripData.trip_shares.map((trip_share, i) => (
                    <div className="note-wrap" key={i}>
                      {/* {trip_share.photos[0] ? <img src={trip_share.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />} */}
                      <p>You have been invited to join a trip to {trip_share.destination} on {this.formatDate(new Date(trip_share.start_date))}</p>
                      <button onClick={() => this.joinTrip(trip_share.id)}>Join</button>
                    </div>
                  ))}
                {this.state.tripData.trip_offers.length > 0 &&
                  this.state.tripData.trip_offers.map((trip_offer, i) => (
                    <div className="note-wrap" key={i}>
                      {/* {trip_share.photos[0] ? <img src={trip_share.photos[0].image} alt="" /> : <img src="https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png" alt="placeholder" />} */}
                      <p>... has requested to join your trip to {trip_offer.destination} on {this.formatDate(new Date(trip_offer.start_date))}</p>
                      <button onClick={() => this.getRequestData(trip_offer.id)}>Accept</button>
                    </div>
                  ))}
                  </div>}
          </div>
        </div>
      </div>
    )
  }
}

export default MyNotifications