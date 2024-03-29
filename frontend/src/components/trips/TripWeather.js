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
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${key}`)
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
    const { main, description, icon } = this.state
    return (
      <div className="weather">
        {/* <h3>Current weather</h3> */}
        <div className="main">
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" />
          <p>{this.calculateTemp()}℃</p>
        </div>
        <p>{main} - {description}</p>
      </div>
    )
  }
}

export default TripWeather