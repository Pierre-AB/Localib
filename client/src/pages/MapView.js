import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';



import StoresList from '../components/Maps/storesList'
// import Map from '../components/Maps/maps'

import SearchBar from '../components/SearchBar'

// import SearchMap from '../components/Maps/MapFilters' // for desktop
// import MapFilters from '../components/Maps/searchAddress'// for mobile
import Navigation from '../components/Navigation'




import FilteredMap from '../components/Maps/FilteredMap' // common for desktop & mobile


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    query: '',
    isMobile: false,
    addressValue: "",
    addresseSearched: false,
    latitude: "", 
    longitude: "", 
    listOfSearchedStores: [],
    mapLoaded: false,
    centerGeolocated: false
  }
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

  // recupérer l'adresse

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ 
      addressValue: address,
      addresseSearched: false,
      centerGeolocated: false
     });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((pos) => {
        // pour récupérer les coordinates
        const lat = pos.lat
        const lng = pos.lng
        console.log('success geoloc 🗺', pos)
        // if success
        this.setState({
          latitude: lat,
          longitude: lng,
          addresseSearched: true // in order to recharge the map
        })
        // on appel la DB pour récupérer les stores à partir de latitude et longitude
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/stores/distances/${this.state.latitude},${this.state.longitude}`)
        // On ajoute les stores au state pour les utiliser dans le render
        .then(responseFromApi => {
          this.setState({
            listOfSearchedStores: responseFromApi.data            
          })
        })
      })
  };

  searchAroundMe = () => {
    this.setState({
      addresseSearched: false,
      latitude: "",
      longitude: "",
      centerGeolocated: true
    })
  }


  render() {
    const {query, latitude, longitude, addresseSearched, centerGeolocated, listOfSearchedStores, addressValue, mapLoaded} = this.state;
    return (
      <div className={`${this.state.isMobile ? "page-container-mobile" : "map-view page-container-desktop"}`}>
        <SearchBar 
        query={this.state.query} 
        updateQuery={this.updateQuery} 
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        searchAroundMe={this.searchAroundMe}
        />
        <FilteredMap 
        query={query}
        searchedLatitude={latitude}
        searchedLongitude={longitude}
        addresseSearched={addresseSearched}
        listOfSearchedStores={listOfSearchedStores}
        addressValue={addressValue}
        mapLoaded={mapLoaded}
        handleSelect={this.handleSelect}
        centerGeolocated={centerGeolocated}
         />
      </div>
    );
  }
}


export default MapView;