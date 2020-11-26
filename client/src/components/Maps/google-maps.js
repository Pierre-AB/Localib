import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { geolocated } from "react-geolocated";
import axios from 'axios';
import StoresList from './storesList'

require('dotenv').config();


const MapsKey = process.env.GOOGLE_MAPS_API_KEY


class MapContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      latitude: "",
      longitude: ""
    };
    this.askLocation = this.askLocation.bind(this);
  }

  startApp() {
    this.getLocation();
  }

  askLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        console.log('success geoloc 🗺', pos)
        // success
        this.setState({
          latitude: lat,
          longitude: lng,
          initLatitud: lat,
          initLongitude: lng
        })
        axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}`)

          .then(responseFromApi => {
            this.setState({
              listOfStores: responseFromApi.data
              
            })
          })
      })
    } else {
      alert("Please turn on your geolocalisation")
    }
  }

  componentDidMount() {
    this.askLocation()
  }




render() {
 
    return (
      <Map
        google={this.props.google}
        zoom={9}
        // style={"./mapStyles.js"}
        initialCenter={{ 
          lat: 48.794878, 
          lng: 2.4614197
          }}
      >
        {this.state.listOfStores.map(store => {
              return (
              <Marker
                key={store._id}
                position={{ 
                  lat: store.location.coordinates[1], 
                  lng: store.location.coordinates[0]
                  }}
                // icon= {{
                //   url: '../../logo.svg',
                //   // scaledSize: new window.google.maps.Size(30,30),
                //   }}
              />
            )
          })
        }

     </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM"
  })(MapContainer);

