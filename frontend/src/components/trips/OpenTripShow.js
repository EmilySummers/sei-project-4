import React from 'react'
import axios from 'axios'
import MicrolinkCard from '@microlink/react'
import Auth from '../../lib/auth'
import { notify } from 'react-notify-toast'
import TripMap from '../trips/TripMap'
import TripWeather from '../trips/TripWeather'

class OpenTripShow extends React.Component {
  state = {
    trip: {},
    photos: [],
    image: { image: '' },
    displayImgUp: false,
    attractions: [],
    link: { link: '' },
    to_dos: [],
    to_do: { to_do: '' },
    data: { open_trip: false },
    errors: {},
    // tripData: { attendees: [] },
    currentUser: {
      id: null,
      username: '',
      image: ''
    },
    tripData: { trips: [] },
    requestData: { trip_requests: [] },
    offerData: { trip_offers: [] }
    // trips: [],
    // joinTrip: { id: null, destination: '' }

  }

  async getData() {
    const tripId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({
        trip: res.data,
        photos: res.data.photos,
        attractions: res.data.attractions,
        to_dos: res.data.to_dos,
        // joinTrip: { id: res.data.id, destination: res.data.destination },
        data: { open_trip: res.data.open_trip }
      })
    } catch (err) {
      console.log(err)
    }
  }

  // async getUserTrips() {
  //   try {
  //     const { data } = await axios.get('/api/profile', {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ tripData: { trips: data.trips} })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  componentDidMount() {
    this.getData()
    this.getUserRequests()
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  //  joinTrip = () => {
  //   const tripId = parseInt(this.props.match.params.id)
  //   this.setState({ tripData: { trips: [ ...this.state.tripData.trips, tripId ] } }, () => {
  //     this.assignTrip()
  //   })
  // }

  // assignTrip = async() => {
  //   const userId = Auth.getUser()
  //   try {
  //     await axios.put(`/api/${userId}/`, this.state.tripData, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/mytrips')
  //   } catch (err) {
  //     this.setState({ errors: err.response.data })
  //   }
  // }

  async getUserRequests() {
    const userId = Auth.getUser()
    try {
      const { data } = await axios.get(`/api/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const filteredIds = data.trip_requests.map(trip_request => {
        return trip_request.id
      })
      this.setState({ requestData: { trip_requests: [...filteredIds] } })
    } catch (err) {
      console.log(err)
    }
  }

  generateRequest = () => {
    const tripId = parseInt(this.props.match.params.id)
    this.setState({ requestData: { trip_requests: [...this.state.requestData.trip_requests, tripId] } }, () => {
      this.sendRequest()
    })
  }

  sendRequest = async () => {
    const userId = Auth.getUser()
    try {
      await axios.put(`/api/${userId}/`, this.state.requestData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      localStorage.setItem('requestee', userId)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
    this.getOwnerOffers()
  }

  getOwnerOffers = async () => {
    const ownerId = this.state.trip.owner.id
    try {
      const { data } = await axios.get(`/api/${ownerId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const filteredIds = data.trip_offers.map(trip_offer => {
        return trip_offer.id
      })
      this.setState({ offerData: { trip_offers: [...filteredIds] } }, () => {
        this.generateOffer()
      })
    } catch (err) {
      console.log(err)
    }
  }

  generateOffer = () => {
    const tripId = parseInt(this.props.match.params.id)
    this.setState({ offerData: { trip_offers: [...this.state.offerData.trip_offers, tripId] } }, () => {
      this.sendOffer()
    })
  }

  sendOffer = async () => {
    const ownerId = this.state.trip.owner.id
    try {
      await axios.put(`/api/${ownerId}/`, this.state.offerData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      notify.show('Request sent!', 'success', 3000)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { destination, start_date, end_date } = this.state.trip
    const { photos, attractions, to_dos } = this.state
    return (
      <div className="hero show-hero">
        <div className="show-container">
          <div className="button-wrapper">
            <button onClick={this.generateRequest} className="button-join"></button>
          </div>
          <div className="title-wrapper">
            <h2>{destination}</h2>
          </div>
          <h3>{this.formatDate(new Date(start_date))} - {this.formatDate(new Date(end_date))}</h3>
          <div className="columns is-mobile is-multiline">
            <div className="column is-one-half-desktop is-fullwidth-mobile">
              <div className="show-photos">
                {photos.map(photo => <img className="closed-board-photo" src={photo.image} key={photo.id} alt="" />)}
              </div>
              <div className="todos">

                <ul>
                  <p className="todo-header">To do...</p>
                  {to_dos.map(task => <li key={task.id}>{task.to_do}</li>)}
                </ul>
              </div>
            </div>
            <div className="column is-one-half-desktop is-fullwidth-mobile">
              <div className="show-links-open">
                  {attractions.map(attraction => <MicrolinkCard url={attraction.link} key={attraction.id} />)}
              </div>

              {destination &&
                <div className="extras">
                  <TripMap
                    destination={destination}
                  />
                  <TripWeather
                    destination={destination}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OpenTripShow