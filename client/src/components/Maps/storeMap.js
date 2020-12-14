
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import mapStyles from "./mapStyles";
import '../Maps/Map.css';


// Loader Icon

require('dotenv').config();

//const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" 
const apiKey = `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`

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
        className="storeDetailsMap" 
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
        latitude={store.location.coordinates[1]}
        longitude={store.location.coordinates[0]}            
      >

      </Marker>

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div key={this.state.selectedPlace.id} className={`${this.state.isMobile ? "nearby-card-infowindow-mobile" : "nearby-card-desktop-infowindow-container"}`} style={this.state.isMobile ? { backgroundImage:`linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${this.state.selectedPlace.image})` } : {}} >                      
                  {this.state.isMobile ? "" : (<img className="nearby-card-infowindow-desktop" src={`${this.state.selectedPlace.image}`} />)}
                      <div className={`${this.state.isMobile ? "nearby-store-infowindow-mobile" : "nearby-store-infowindow-desktop"}`}>
                          <h4 className="nearby-store-title">{this.state.selectedPlace.name}</h4>
                          <p className="nearby-store-address">{this.state.selectedPlace.address}</p>
                          <p className="nearby-store-address">{Math.floor(this.state.selectedPlace.distance)} meters</p>
                          <form target="_blank" action={`http://www.google.com/maps/place/${this.state.selectedPlace.latitude},${this.state.selectedPlace.longitude}` }>
                              <button type="submit">GO</button>
                          </form>
                      </div>
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