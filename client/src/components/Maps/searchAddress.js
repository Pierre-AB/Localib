
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import mapStyles from "./mapStyles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import GoogleMap from './google-maps'


const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" // process.env.GOOGLE_MAPS_API_KEY; // "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM"

class MapContainerSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [], // for stores
      latitude: "", // avant de récupérer l'information de la recherche
      longitude: "", // avant de récupérer l'information de la recherche 
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      addresseSearched: false,
      addressValue: ""
    };
    // this.searchLocation = this.searchLocation.bind(this);
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
  // Options de la carte
  const options = {
    disableDefaultUI: true,
    zoomControl: true,

  };

  const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className="autocomplete-root">
      <input className="form-control" {...getInputProps()} />
      <div className="autocomplete-dropdown-container">
        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)} className="suggestion">
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
    </div>
  );


  const onError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status)
    clearSuggestions()
  }
  

  //logo Localib dans les markers de la carte
  const icon = { 
    url: `https://res.cloudinary.com/dbsnbga7z/image/upload/v1606577861/localib/LogoMap_fy7h3i.png`,
    origin: new window.google.maps.Point(0, 0),
    scaledSize: new window.google.maps.Size(45, 60),
  }
  
  const addresseSearched = this.state.addresseSearched

  
  
    return (
      <div>
      <PlacesAutocomplete
        value={this.state.addressValue}
        onChange={addressValue => this.setState({ addressValue })}
        onSelect={this.handleSelect}
        onError={onError}
        searchOptions={{componentRestrictions: { country: ['fr'] }}
        }
      >
        {renderInput}
      </PlacesAutocomplete>
      {addresseSearched ?
      <div>
      <Map
        google={this.props.google}
        styles={this.props.mapStyle}
        zoom={16}
        options={options}
        onClick={this.onMapClicked}
        initialCenter={{ 
          lat: this.state.latitude,  
          lng: this.state.longitude
          }}
      >
      {this.state.listOfStores.map(store => {
          return (
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
            >           

          </Marker>
          )
        })
      }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <img src={this.state.selectedPlace.image} width="64" height="64"></img>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>{this.state.selectedPlace.address}</h3>
              <p>{this.state.selectedPlace.distance} meters</p>
            </div>
        </InfoWindow>

     </Map>
     </div>
     // la carte n'a pas été chargée ? retourne moi: 
     :  <GoogleMap />
      }
      </div>
    ) 
  }
}

//Pour récupérer le style de la carte (fichier JSON avec le format)
MapContainerSearch.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey
 })(MapContainerSearch);


