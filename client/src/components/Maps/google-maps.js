import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import StoresList from './storesList'

require('dotenv').config();


const MapsKey = process.env.GOOGLE_MAPS_API_KEY


class MapContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      listOfStores: [],
     }
  }
render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        // style={"./mapStyles.js"}
        initialCenter={{ lat: 48.794841299999995, lng: 2.4615405999999997}}
      >
     </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: MapsKey
  })(MapContainer);

