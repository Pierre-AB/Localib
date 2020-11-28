import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Geolocated from '../components/Maps/geolocated';

import StoresList from '../components/Maps/storesList'
import Map from '../components/Maps/google-maps'
import SearchBar from '../components/SearchBar'


class MapView extends Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div>
        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        <Geolocated />
        <StoresList />
        <h1>MAP</h1>
        {/* <Map /> */}
      </div>
    );
  }
}

export default MapView;