import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Geolocated from '../components/Maps/geolocated';
import StoresList from '../components/Maps/storesList'
import Map from '../components/Maps/map'


class MapView extends Component {
  render() {
    return (
      <div>
        <Geolocated />
        <StoresList />
        {/* <h1>MAP</h1> */}
        {/* <Map /> */}
      </div>
    );
  }
}

export default MapView;