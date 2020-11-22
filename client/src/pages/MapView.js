import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Geolocated from '../components/Maps/geolocated';
import StoresList from '../components/Maps/viewMap'



class MapView extends Component {
  render() {
    return (
      <div>
        <Geolocated />
        <StoresList />
      </div>
    );
  }
}

export default MapView;