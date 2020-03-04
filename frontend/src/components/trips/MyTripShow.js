import React from 'react'
import axios from 'axios'
import ImageUpload from '../ImageUpload'
import MicrolinkCard from '@microlink/react'
import { notify } from 'react-notify-toast'

import Auth from '../../lib/auth'
import TripMap from '../trips/TripMap'
import TripWeather from '../trips/TripWeather'

class MyTripShow extends React.Component {
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
    shareData: { trip_shares: [] },
    shareUser: {},
    message: 'Share successful!',
    dateEdit: true,
    editData: {}
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
    }
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleToDo = e => {
    const to_do = { [e.target.name]: e.target.value }
    this.setState({ to_do })
  }

  createToDo = async e => {
    e.preventDefault()
    const tripId = this.props.match.params.id
    try {
      await axios.post(`/api/trips/${tripId}/to_dos/`, this.state.to_do, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ to_do: { to_do: '' } })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteToDo = async task => {
    const tripId = this.props.match.params.id
    try {
      await axios.delete(`/api/trips/${tripId}/to_dos/${task.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleAttraction = e => {
    const link = { [e.target.name]: e.target.value }
    this.setState({ link })
  }

  createAttraction = async e => {
    e.preventDefault()
    const tripId = this.props.match.params.id
    try {
      await axios.post(`/api/trips/${tripId}/attractions/`, this.state.link, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ link: { link: '' } })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteAttraction = async attraction => {
    const tripId = this.props.match.params.id
    try {
      await axios.delete(`/api/trips/${tripId}/attractions/${attraction.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handlePhoto = e => {
    const image = { [e.target.name]: e.target.value }
    this.setState({ image, displayImgUp: !this.state.displayImgUp })
  }

  createPhoto = async e => {
    e.preventDefault()
    const tripId = this.props.match.params.id
    try {
      await axios.post(`/api/trips/${tripId}/photos/`, this.state.image, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ image: { image: '' }, displayImgUp: !this.state.displayImgUp })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeletePhoto = async photo => {
    const tripId = this.props.match.params.id
    try {
      await axios.delete(`/api/trips/${tripId}/photos/${photo.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
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
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  toggleStatus = (e) => {
    e.preventDefault()
    this.setState({ data: { open_trip: !this.state.data.open_trip } }, () => {
      this.editTrip()
    })
  }

  editTrip = async () => {
    const tripId = this.props.match.params.id
    try {
      await axios.put(`/api/trips/${tripId}/`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      }, () => {
        this.getData()
      })
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  handleChangeShare = e => {
    const shareUser = { ...this.state.shareUser, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ shareUser, errors })
  }

  shareTrip = async e => {
    e.preventDefault()
    try {
      const res = await axios.get('/api/roamers', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const shareWith = res.data.filter(user => {
        return user.email === this.state.shareUser.email
      })
      const userId = shareWith[0].id
      this.getUserShares(userId)
    } catch (err) {
      console.log(err)
      // this.setState({ errors: err.response.data })
    }
  }

  getUserShares = async userId => {
    try {
      const { data } = await axios.get(`/api/${userId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const filteredIds = data.trip_shares.map(trip_share => {
        return trip_share.id
      })
      this.setState({ shareData: { trip_shares: [...filteredIds] } }, () => {
        this.addTripShare(userId)
      })
    } catch (err) {
      console.log(err)
    }
  }

  addTripShare = async userId => {
    const tripId = parseInt(this.props.match.params.id)
    this.setState({ shareData: { trip_shares: [...this.state.shareData.trip_shares, tripId] } }, () => {
      this.completeShare(userId)
    })
  }

  completeShare = async userId => {
    try {
      await axios.put(`/api/${userId}/`, this.state.shareData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ shareUser: { email: '' } })
      notify.show(this.state.message, 'success', 3000)
    } catch (err) {
      console.log(err)
      // this.setState({ errors: err.response.data })
    }
  }

  toggleEdit = () => {
    this.setState({ dateEdit: false })
  }

  handleChangeEdit = e => {
    const editData = { ...this.state.editData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ editData, errors })
  }

  editDates = async () => {
    const tripId = this.props.match.params.id
    try {
      await axios.put(`/api/trips/${tripId}/`, this.state.editData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }


  render() {
    const { destination, start_date, end_date } = this.state.trip
    const { photos, attractions, to_dos, dateEdit } = this.state
    return (
      <div className="hero show-hero">
        <div className="show-container">
          <div className="button-wrapper">
            <form className="share-form" onSubmit={this.shareTrip}>
              <input
                onChange={this.handleChangeShare}
                placeholder="Enter email to share trip"
                name="email"
                value={this.state.shareUser.email || ''}
              />
              <button></button>
            </form>
            {this.state.data.open_trip ?
              <div className="open-wrapper">
                <button onClick={this.toggleStatus} className="button-close">Close Trip</button>
                <small>Public / Private</small>
              </div>
              :
              <div className="open-wrapper">
                <button onClick={this.toggleStatus} className="button-open"></button>
                <small>Public / Private</small>
              </div>
            }
          </div>
          <div className="title-wrapper">
            <h2>{destination}</h2>
          </div>
          {dateEdit ?
            <div className="show-edit-dates">
              <h3>{this.formatDate(new Date(start_date))} - {this.formatDate(new Date(end_date))}</h3>
              <button className="date-button" onClick={this.toggleEdit}>✎</button>
            </div>
            :
            <form onSubmit={this.editDates}>
              <div className="field">
                <div className="control">
                  <input className="input" onChange={this.handleChangeEdit} placeholder="From" name="start_date" type="date"></input>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className={this.state.errors.message ? 'input is-danger' : 'input'}
                    onChange={this.handleChangeEdit}
                    placeholder="To"
                    name="end_date"
                    type="date" />
                </div>
                {this.state.errors.message && <small className="help is-danger">{this.state.errors.message}</small>}
              </div>
              <button className="button">Save changes</button>
            </form>
          }
          <div className="columns is-mobile is-multiline">
            <div className="column is-one-half-desktop is-fullwidth-mobile">
              <div className="show-photos">
                {photos.map(photo => (
                  <div className="photo-wrapper" key={photo.id}>
                    <img className="board-photo" src={photo.image} alt="" />
                    <button className="photo-button" onClick={() => this.handleDeletePhoto(photo)}>✗</button>
                  </div>
                ))}
                <form onSubmit={this.createPhoto}>
                  <div className="photo-wrapper">
                    <div className="image-container">
                      <ImageUpload
                        handleChange={this.handlePhoto}
                        fieldName="image"
                        displayImgUp={this.state.displayImgUp}
                        preset="j4ev6wv3"
                        inputClassName="profile-image"
                      />
                    </div>
                  </div>

                </form>
              </div>
              <div className="my-todos">
                <ul>
                  <p className="todo-header">To do...</p>
                  {to_dos.map(task => (
                    <div className="task-container" key={task.id}>
                      <li>{task.to_do}</li>
                      <button className="task-button" onClick={() => this.handleDeleteToDo(task)}>✘</button>
                    </div>
                  ))}
                </ul>
                <form className="task-form" onSubmit={this.createToDo}>
                  <input
                    className="input"
                    onChange={this.handleToDo}
                    placeholder="New task"
                    name="to_do"
                    value={this.state.to_do.to_do}
                  />
                  <button className="button">Add task</button>
                </form>
              </div>
            </div>
            <div className="column is-one-half-desktop is-fullwidth-mobile">
              <div className="show-links">
                {attractions.map(attraction => (
                  <div className="link-wrapper" key={attraction.id}>
                    <MicrolinkCard className="microlink" url={attraction.link} />
                    <button className="photo-button" onClick={() => this.handleDeleteAttraction(attraction)}>✘</button>
                  </div>
                ))}
                <form className="link-form" onSubmit={this.createAttraction}>
                  <input className="input" onChange={this.handleAttraction} placeholder="Add your link here" name="link" value={this.state.link.link}></input>
                  <button className="button">✔︎</button>
                </form>
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
      </div >
    )
  }
}

export default MyTripShow