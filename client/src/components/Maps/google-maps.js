import React from 'react';
import { GoogleMapReact, Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
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
      longitude: "",
      selected: null,
      mapLoaded: false
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
          mapLoaded: true
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

  const options = {
    disableDefaultUI: true,
    zoomControl: true,

  };


  const icon = { 
     url: `./icons/LogoMap.png`,
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
    scaledSize: new window.google.maps.Size(30, 30),
  }
  
  const mapLoaded = this.state.mapLoaded;
  const selected = this.state.selected;
  
    return (
      mapLoaded ?
      <div>
      <Map
        google={this.props.google}
        styles={this.props.mapStyle}
        zoom={16}
        options={options}
        initialCenter={{ 
          lat: this.state.latitude,  
          lng: this.state.longitude
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
                  onClick={() => {
                  this.setState({
                    selected: store
                  });
                  }}
                  // icon={icon}
                >
                 

          {selected ? (
          <InfoWindow
            position={{ 
              lat: selected.lat,
              lng: selected.lng }}
              onCloseClick={() => {
                  this.setState({
                    selected: null
                  });
                  }}
          >
            <div>
              <h2>
                  {selected.fullName}
              </h2>
            </div>
          </InfoWindow>
        ) : null}

              </Marker>
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
     : <h1> Map Loading </h1>
    ) 
  }
}

MapContainer.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey: "insert KEY"
  })(MapContainer);

