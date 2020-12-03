import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import Geolocated from '../components/Maps/geolocated';

import StoresList from '../components/Maps/storesList'
// import Map from '../components/Maps/maps'
import Map from '../components/Maps/google-maps'

import SearchBar from '../components/SearchBar'


class MapView extends Component {
  state = {
    query: '',
    isMobile: false
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({isMobile: window.innerWidth <= 992});
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }

  render() {
    return (
      <div className={`${this.state.isMobile ? "page-container-mobile" : "map-view page-container-desktop"}`}>
        {this.state.isMobile ? (
          <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        ) : ""}
        <Map query={this.state.query} />
      </div>
    );
  }
}

export default MapView;