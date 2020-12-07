
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import mapStyles from "./mapStyles";

// Loader Icon

require('dotenv').config();

const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" 

class StoreMap extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

render() {
  // Options de la carte
  const options = {
    disableDefaultUI: true,
    zoomControl: false,

  };

  const store = this.props.store
  //logo Localib dans les markers de la carte
  const icon = { 
    url: `https://res.cloudinary.com/dbsnbga7z/image/upload/v1606577861/localib/LogoMap_fy7h3i.png`,
    origin: new window.google.maps.Point(0, 0),
    // anchor: new window.google.maps.Point(15, 15),
    scaledSize: new window.google.maps.Size(90, 120),
  }
  
  
    return (
      // alors retourne: 
      <div>
      <Map
        google={this.props.google}
        styles={this.props.mapStyle}
        zoom={16}
        options={options}
        initialCenter={{ 
          lat: store.location.coordinates[1],  
          lng: store.location.coordinates[0]
          }}
      >

      <Marker
        key={store._id}
        position={{ 
          lat: store.location.coordinates[1], 
          lng: store.location.coordinates[0]
          }}
        onClick={this.onMarkerClick}
        icon={icon}
        name={store.fullName}
        address={store.address}
        image={store.picture}
        distance={store.distance}                
      >

      </Marker>

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div>
            <img src={this.state.selectedPlace.image} width="64" height="64"></img>
            <h1>{this.state.selectedPlace.name}</h1>
            <h3>{this.state.selectedPlace.address}</h3>
          </div>
      </InfoWindow>
            


     </Map>
     </div>

    ) 
  }
}

//Pour récupérer le style de la carte (fichier JSON avec le format)
StoreMap.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey
  })(StoreMap);