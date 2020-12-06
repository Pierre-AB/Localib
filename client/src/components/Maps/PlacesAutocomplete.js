import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import '../SearchBar.css';


import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import axios from 'axios';


const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" 


class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      addressValue: '',      
      latitude: "",
      longitude: "",
      addresseSearched: false,
      addressValue: ""
    };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ 
      addressValue: address,
      addresseSearched: false
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
          addresseSearched: true
        })
        // on appel la DB pour récupérer les stores à partir de latitude et longitude
        axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}`)
        // On ajoute les stores au state pour les utiliser dans le render
        .then(responseFromApi => {
          this.setState({
            listOfStores: responseFromApi.data            
          })
        })
      })
  };
 
  render() {

    const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
        <input
          {...getInputProps({
            placeholder: 'Search Places ...',
            className: 'location-search-input',
          })}
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
        

    const onError = (status, clearSuggestions) => {
      console.log('Google Maps API returned error with status: ', status)
      clearSuggestions()
    }

  return (
    <div>
      <PlacesAutocomplete
        className="search-container SearchBar"
        value={this.state.addressValue}
        onChange={addressValue => this.setState({ addressValue })}
        onSelect={this.handleSelect}
        onError={onError}
        searchOptions={{componentRestrictions: { country: ['fr'] }}
        }
      >
            <div className="SearchBar">
      <div className="searchbar-place-submit">
        <div className="searchbar-place">
          <div className="searchbar-place-input-wrapper">
            <div>
              <svg width="16" height="16" viewBox="0 0 16 16" className="searchbar-input-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.6a4.8 4.8 0 00-4.797 4.62L3.2 6.4c0 1.778.6 2.334 3.782 7.436a1.2 1.2 0 002.036 0l.952-1.516c2.307-3.648 2.81-4.31 2.83-5.824V6.4A4.8 4.8 0 008 1.6zm0 11.6L5.568 9.34C4.575 7.737 4.4 7.289 4.4 6.4a3.6 3.6 0 017.196-.17l.004.17c0 1.364-.38 1.636-3.6 6.8zM6 6.4a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>
        {renderFunc}
            <button className="searchbar-place-around-me-button dl-button" role="button" type="button">
                    <span>
                      <svg className="searchbar-place-around-me-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
                      <span>Autour de moi</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PlacesAutocomplete>
    </div>
  )
}
}

export default GoogleApiWrapper({
  apiKey
 })(PlacesAutocomplete)
