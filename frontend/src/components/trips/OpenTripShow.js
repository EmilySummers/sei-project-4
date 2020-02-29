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
    errors: {}
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
        data: { open_trip: res.data.open_trip }
      })
    } catch (err) {
      console.log(err)
      // this.props.history.push('/notfound')
    }
  }

  componentDidMount() {
    this.getData()
  }

  // handleChange = e => {
  //   const data = { ...this.state.data, [e.target.name]: e.target.value }
  //   const errors = { ...this.state.errors, [e.target.name]: '' }
  //   this.setState({ data, errors })
  // }

  // handleToDo = e => {
  //   const to_do = { [e.target.name]: e.target.value }
  //   this.setState({ to_do })
  // }

  // createToDo = async e => {
  //   e.preventDefault()
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.post(`/api/trips/${tripId}/to_dos/`, this.state.to_do, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ to_do: { to_do: '' } })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //     // this.props.history.push('/notfound')
  //   }
  // }

  // handleDeleteToDo = async task => {
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/trips/${tripId}/to_dos/${task.id}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // handleAttraction = e => {
  //   const link = { [e.target.name]: e.target.value }
  //   this.setState({ link })
  // }

  // createAttraction = async e => {
  //   e.preventDefault()
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.post(`/api/trips/${tripId}/attractions/`, this.state.link, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ link: { link: '' } })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //     // this.props.history.push('/notfound')
  //   }
  // }

  // handleDeleteAttraction = async attraction => {
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/trips/${tripId}/attractions/${attraction.id}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // handlePhoto = e => {
  //   const image = { [e.target.name]: e.target.value }
  //   this.setState({ image, displayImgUp: !this.state.displayImgUp })
  // }

  // createPhoto = async e => {
  //   e.preventDefault()
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.post(`/api/trips/${tripId}/photos/`, this.state.image, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ image: { image: '' }, displayImgUp: !this.state.displayImgUp })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //     // this.props.history.push('/notfound')
  //   }
  // }

  // handleDeletePhoto = async photo => {
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/trips/${tripId}/photos/${photo.id}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.getData()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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

  // editTrip = async() => {
  //   const tripId = this.props.match.params.id
  //   try {
  //     await axios.put(`/api/trips/${tripId}/`, this.state.data, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     }, () => {
  //       this.getData()
  //     })
  //   } catch (err) {
  //     this.setState({ errors: err.response.data })
  //   }
  // }

  joinTrip = () => {
    this.state.trip
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