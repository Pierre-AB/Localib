import React, { Component } from 'react';


import StoresList from '../components/Maps/storesList'
// import Map from '../components/Maps/maps'

import SearchBar from '../components/SearchBar'

import SearchMap from '../components/Maps/MapFilters' // for desktop
import MapFilters from '../components/Maps/searchAddress'// for mobile
import Navigation from '../components/Navigation'


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
          <>
          <SearchBar fromMapQuery={this.state.query} fromMapUpdateQuery={this.updateQuery} />
          <MapFilters />
          </>
        ) : (<SearchMap query={Navigation.props.query}/>)}
        
      </div>
    );
  }
}


export default MapView;