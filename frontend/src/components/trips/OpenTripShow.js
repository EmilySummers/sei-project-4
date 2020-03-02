import React from 'react'
import axios from 'axios'
import MicrolinkCard from '@microlink/react'
import Auth from '../../lib/auth'

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
    tripData: { trips: [] }
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
      // this.props.history.push('/notfound')
    }
  }

  async getUserTrips() {
    try {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ tripData: { trips: data.trips} })
    } catch (err) {
      console.log(err)
      // this.props.history.push('/notfound')
    }
  }

  componentDidMount() {
    this.getData()
    this.getUserTrips()
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

  // toggleStatus = () => {
  //   this.setState({ data: { open_trip: !this.state.data.open_trip} }, () => {
  //     this.editTrip()
  //   })
  // }

  joinTrip = () => {
    const tripId = parseInt(this.props.match.params.id)
    this.setState({ tripData: { trips: [ ...this.state.tripData.trips, tripId ] } }, () => {
      this.assignTrip()
    })
  }
    
  assignTrip = async() => {
    const userId = Auth.getUser()
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
  
    const { destination, start_date, end_date } = this.state.trip
    const { photos, attractions, to_dos } = this.state
    return (
      <div>
        {/* {this.state.data.open_trip ? */}
        <button onClick={this.joinTrip} className="button">Join Trip</button>
        {/* //   :
        //   <button onClick={this.toggleStatus} className="button">Open Trip</button>
        // } */}
        <h1>{destination}</h1>
        <h2>{this.formatDate(new Date(start_date))} - {this.formatDate(new Date(end_date))}</h2>
        {photos.map(photo => <img className="board-photo" src={photo.image} key={photo.id} alt="" />)}
        {attractions.map(attraction => <MicrolinkCard url={attraction.link} key={attraction.id} />)}
        <ul>
          {to_dos.map(task => <li key={task.id}>{task.to_do}</li>)}
        </ul>
      </div>
    )
  }
}

export default OpenTripShow