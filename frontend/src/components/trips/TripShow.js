import React from 'react'
import axios from 'axios'
import ImageUpload from '../ImageUpload'
import MicrolinkCard from '@microlink/react'
import Auth from '../../lib/auth'

class TripShow extends React.Component {
  state = {
    trip: {},
    start_date: '',
    end_date: '',
    photos: [],
    image: {
      image: ''
    },
    displayImgUp: false,
    attractions: [],
    link: {
      link: ''
    },
    to_dos: [],
    to_do: {
      to_do: ''
    },
    errors: {}
  }

  async getData() {
    const tripId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      //  {
      //   headers: { Authorization: `Bearer ${Auth.getToken()}` }
      // })
      this.setState({
        trip: res.data,
        start_date: res.data.start_date,
        end_date: res.data.end_date,
        photos: res.data.photos,
        attractions: res.data.attractions,
        to_dos: res.data.to_dos
      })
    } catch (err) {
      console.log(err)
      // this.props.history.push('/notfound')
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
      // this.props.history.push('/notfound')
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
      // this.props.history.push('/notfound')
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
      // this.props.history.push('/notfound')
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

  render() {
    const { destination, start_date, end_date } = this.state.trip
    const { photos, attractions, to_dos } = this.state
    return (
      <div>
        <h1>{destination}</h1>
        <h2>{this.formatDate(new Date(start_date))} - {this.formatDate(new Date(end_date))}</h2>
        {photos.map(photo => <img className="board-photo" key={photo.id} src={photo.image} alt="" />)}
        <form onSubmit={this.createPhoto}>
          <ImageUpload
            handleChange={this.handlePhoto}
            clearPhoto={this.clearPhoto}
            fieldName="image"
            displayImgUp={this.state.displayImgUp}
          />
          <button className="button">Pin photo</button>
        </form>
        {/* {attractions.map(attraction => <a key={attraction.id} href={attraction.link}>{attraction.link}</a>)} */}
        
        {attractions.map(attraction => (
          <MicrolinkCard key={attraction.id} url={attraction.link} />
        ))}
        <form onSubmit={this.createAttraction}>
          <input className="input" onChange={this.handleAttraction} placeholder="Add your link here" name="link" value={this.state.link.link}></input>
          <button className="button">Add attraction</button>
        </form>
        <ul>
          {to_dos.map(task => <li key={task.id}>{task.to_do}</li>)}
        </ul>
        <form onSubmit={this.createToDo}>
          <input className="input" onChange={this.handleToDo} placeholder="New task" name="to_do" value={this.state.to_do.to_do}></input>
          <button className="button">Add task</button>
        </form>
      </div>
    )
  }
}

export default TripShow