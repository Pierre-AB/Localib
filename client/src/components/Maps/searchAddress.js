
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios';
import mapStyles from "./mapStyles";


// Loader Icon
import { useLoading, ThreeDots } from '@agney/react-loading';

const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" // process.env.GOOGLE_MAPS_API_KEY; // "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM"

class MapContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [], // for stores
      latitude: "", // avant de récupérer l'information du navigateur
      longitude: "", // avant de récupérer l'information du navigateur
      selected: null, // pour savoir si le store (le marker du store a été clické)
      mapLoaded: false, // si mapLoaded est ture, alors afficher la carte
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      addressSearched: null
    };
    this.searchLocation = this.searchLocation.bind(this);
  }
  // on a besoin de connaître la Location du navigateur afin d'obtenir latitude et longitude
  searchLocation() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // pour récupérer les coordinates
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        console.log('success geoloc 🗺', pos)
        // if success
        this.setState({
          latitude: lat,
          longitude: lng,
          mapLoaded: true
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
    } else { //si la geolocalisation n'a pas été activée 
      // TO DO: ici il faudra proposer au client de renseigner une adresse s'il ne veut pas être geolocalisé
      alert("Please turn on your geolocalisation")
    }
  }

  // on execute la function
  componentDidMount() {
    this.searchLocation()
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

  handleChange = (event) => {  
    const {addressSearched, value} = event.target;
    this.setState({[addressSearched]: value});
    geocodeByAddress('Montevideo, Uruguay')
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log('Successfully got latitude and longitude', { lat, lng })
      );
  }


render() {
  // Options de la carte
  const options = {
    disableDefaultUI: true,
    zoomControl: true,

  };

  

  //logo Localib dans les markers de la carte
  const icon = { 
    url: `https://res.cloudinary.com/dbsnbga7z/image/upload/v1606577861/localib/LogoMap_fy7h3i.png`,
    origin: new window.google.maps.Point(0, 0),
    scaledSize: new window.google.maps.Size(45, 60),
  }
  
  //pour vérifier si la carte a été chargée
  const mapLoaded = this.state.mapLoaded;
  // vérifier si le marker a été sélectionné
  const selected = this.state.selected;

  
  
    return (
      mapLoaded ? // la carte a été chargée ?
      // alors retourne: 
      <div>
      <GooglePlacesAutocomplete
        onChange={ e => this.handleChange(e)}
      />
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
     :  <ThreeDots width="30" />
    ) 
  }
}

//Pour récupérer le style de la carte (fichier JSON avec le format)
MapContainer.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey
  })(MapContainer);

