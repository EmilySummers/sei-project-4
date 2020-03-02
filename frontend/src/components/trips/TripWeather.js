import React from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_WEATHER

class TripWeather extends React.Component {
  state = {
    main: '',
    description: '',
    icon: '',
    temp: 0
  }

  async componentDidMount() {
    const destination = this.props.destination
    try {
      const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=7bb82663126ba33c862695982882b9ba`)
      this.setState({ main: data.weather[0].main, description: data.weather[0].description, icon: data.weather[0].icon, temp: data.main.temp })
      this.calculateTemp()
    } catch (err) {
      console.log(err)
    }
  }

  calculateTemp = () => {
    const temp = Math.round(this.state.temp - 273.15)
    return temp
  }


  render() {
    const { main, description, icon, temp } = this.state
    console.log(icon)
    return (
      <div>
        <h1>Weather</h1>
        <p>{main}</p>
        <p>{description}</p>
        <img src={`../../assets/${icon}.png`} alt="weather" />
        <p>{this.calculateTemp()}℃</p>
      </div>
    )
  }
}

export default TripWeather