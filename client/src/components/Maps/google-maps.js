import React from 'react';
import { GoogleMap, Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { geolocated } from "react-geolocated";
import axios from 'axios';
import mapStyles from "./mapStyles";

require('dotenv').config();


const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

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
      <div>
      <Map
        google={this.props.google}
        // options={options}
        zoom={9}
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
              />
            )
          })
        }

                     {/* <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{store.fullname}</h4>
                  </div>
                </InfoWindow> */}

     </Map>
     </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM",
  })(MapContainer);

