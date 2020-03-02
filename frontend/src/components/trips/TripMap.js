import React from 'react'
import axios from 'axios'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from 'react-map-gl-geocoder'
// import { Link } from 'react-router-dom'

const token = process.env.REACT_APP_MAPBOX

class TripMap extends React.Component {
  state = {
    viewport: {
      longitude: 0,
      latitude: 0,
      zoom: 0
    }
  }

  myMap = React.createRef()

  async componentDidMount() {
    const destination = this.props.destination
    try {
      const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?access_token=${token}`)
      this.setState({ viewport: { longitude: res.data.features[0].center[0], latitude: res.data.features[0].center[1], zoom: 10 } })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <ReactMapGL
          ref={this.myMap}
          {...this.state.viewport}
          height={'30vh'}
          width={'30vw'}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={token}
        >
          <NavigationControl />
          {/* <Marker
            {...this.state.viewport}
          >
            <img className="marker" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="marker" />
          </Marker> */}
        </ReactMapGL>
        <Geocoder
          mapRef={this.myMap}
          mapboxApiAccessToken={token}
          onViewportChange={viewport => this.setState({ viewport })}
          position="bottom-right"
        />
      </>
    )
  }
}

export default TripMap