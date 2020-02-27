import React from 'react'
import axios from 'axios'

class TripShow extends React.Component {
  state = {
    trip: {},
    start_date: '',
    end_date: '',
    photos: [],
    attractions: [],
    to_dos: []
  }

  async getData() {
    const tripId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/trips/${tripId}`)
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

  // async addPhoto() {
  //   const tripId = this.props.match.params.id
  //   try {
  //     const res = await axios.post(`/api/trips/${tripId}/photos`)
  //     this.setState({})
  //   } catch (err) {
  //     console.log(err)
  //     // this.props.history.push('/notfound')
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

  render() {
    const { destination, start_date, end_date } = this.state.trip
    const { photos, attractions, to_dos } = this.state
    return (
      <div>
        <h1>{destination}</h1>
        <h2>{this.formatDate(new Date(start_date))} - {this.formatDate(new Date(end_date))}</h2>
        {photos.map(photo => <img className="board-photo" key={photo.id} src={photo.image} alt="" />)}
        <button onClick={this.addPhoto} className="button">Add photo</button>
        {attractions.map(attraction => <a key={attraction.id} href={attraction.link}>{attraction.link}</a>)}
        <ul>
          {to_dos.map(task => <li key={task.id}>{task.to_do}</li>)}
        </ul>
      </div>
    )
  }
}

export default TripShow