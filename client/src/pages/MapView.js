import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Geolocated from '../components/Maps/geolocated';

import StoresList from '../components/Maps/storesList'
// import Map from '../components/Maps/maps'
import Map from '../components/Maps/google-maps'
import Mapsearch from '../components/Maps/searchAddress'

import SearchBar from '../components/SearchBar'

import SearchMap from '../components/Maps/SearchMapList'




class MapView extends Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div className="page-container">
      <br></br>
      <br></br>
      <br></br>

        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        {/* <Geolocated />
        <StoresList />
        <h1>MAP</h1> */}
        <Mapsearch/>
        {/* <SearchMap query={this.state.query} /> */}
      </div>
    );
  }
}

export default MapView;