import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { Link } from 'react-router-dom'

const token = process.env.REACT_APP_MAPBOX

class TripMap extends React.Component {
  state = {
    viewport: {
      longitude: 0,
      latitude: 0
    }
  }

  myMap = React.createRef()

  async componentDidMount() {
    const destination = this.props.destination
    try {
      const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?access_token=${token}`)
      this.setState({ viewport: { longitude: res.data.features[0].center[0], latitude: res.data.features[0].center[1] } })
    } catch (err) {
      console.log(err)
    }
  }

  // async componentDidMount() {
  //   try {
  //     const search = location.pathname.split('/').slice(2).join('/')
  //     const mapStartFocus = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`)
  //     if (mapStartFocus.data.features.length === 0) {
  //       this.props.history.push('/map/london')
  //       alert('Sorry we couldn\'t find that address')
  //     } else {
  //       const firstLatLng = mapStartFocus.data.features[0].center
  //       this.setState({ viewport: { longitude: firstLatLng[0], latitude: firstLatLng[1], zoom: 12 } })
  //     }
  //     const res = await axios.get('/api/chefs')
  //     this.setState({ users: res.data })
  //     await this.findlatlong()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  render() {
    return (
      <>
        <MapGL
          ref={this.myMap}
          {...this.state.viewport}
          height={'30vh'}
          width={'30vw'}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          // onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={token}
          zoom={12}
        />
        <Geocoder
          mapRef={this.myMap}
          mapboxApiAccessToken={token}
          // onViewportChange={this.handleViewportChange}
          position="bottom-left"
        />
      </>
    )
  }
}

export default TripMap