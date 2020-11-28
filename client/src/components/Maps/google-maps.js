
import React from 'react';
import { GoogleMapReact, Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { geolocated } from "react-geolocated";
import axios from 'axios';
import mapStyles from "./mapStyles";

require('dotenv').config();

const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" // process.env.GOOGLE_MAPS_API_KEY; // "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM"
// const mapContainerStyle = {
//   height: "100vh",
//   width: "100vw",
// };

// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
// };

class MapContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [], // for stores
      latitude: "", // avant de récupérer l'information du navigateur
      longitude: "", // avant de récupérer l'information du navigateur
      selected: null, // pour savoir si le store (le marker du store a été clické)
      mapLoaded: false // si mapLoaded est ture, alors afficher la carte
    };
    this.askLocation = this.askLocation.bind(this);
  }
  // on a besoin de connaître la Location du navigateur afin d'obtenir latitude et longitude
  askLocation() { 
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
    this.askLocation()
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
    anchor: new window.google.maps.Point(15, 15),
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
      <Map
        google={this.props.google}
        styles={this.props.mapStyle}
        zoom={16}
        options={options}
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
                  onClick={() => {
                  this.setState({
                    selected: store
                  });
                  }}
                  icon={icon}
                >
                 

          {selected ? (
          <InfoWindow
            position={{ 
              lat: store.location.coordinates[1],
              lng: store.location.coordinates[0]
               }}
              visible= {true}
              onCloseClick={() => {
                  this.setState({
                    selected: null
                  });
                  }}
            
          >
            <div>
              <h2>
                  {store.fullName}
              </h2>
              <p>hello</p>
            </div>
          </InfoWindow>
        ) : null
        }

              </Marker>
            )
          })
        }

                     {/* <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{store.fullname}</h4>
                  </div>
                </InfoWindow> */}

     </Map>
     </div>
     // la carte n'a pas été chargée ? retourne moi: 
     :  <h1> Map Loading </h1>
    ) 
  }
}

//Pour récupérer le style de la carte (fichier JSON avec le format)
MapContainer.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey
  })(MapContainer);

