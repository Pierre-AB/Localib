//Map creation 
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import mapStyles from "./mapStyles";
import { Link, withRouter } from 'react-router-dom';
import './Map.css';


// Loader Icon
import { useLoading, ThreeDots } from '@agney/react-loading';

//const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" 
const apiKey = `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
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
      listOfProducts: [],
      latitude: "", // avant de récupérer l'information du navigateur
      longitude: "", // avant de récupérer l'information du navigateur
      selected: null, // pour savoir si le store (le marker du store a été clické)
      mapLoaded: false, // si mapLoaded est ture, alors afficher la carte
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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
        axios.get(`${process.env.REACT_APP_APIURL || ""}api/stores/distances/${this.state.latitude},${this.state.longitude}`)
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

  // Bring the products data
  getProducts = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((productsFromDb) => {
        const allProducts = productsFromDb.data;
        this.setState({
          listOfProducts: allProducts
        })
        console.log("list of Products", this.state.listOfProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on execute la function
  componentDidMount() {
    this.askLocation();
    this.getProducts();
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

  // Use store picture as background
  let background = this.state.selectedPlace.image;
    
    return (
      mapLoaded ? // la carte a été chargée ?
      // alors retourne: 
      <div className="map-container-desktop">
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
            {/* <Link to={`/storeDetails/${this.state.selectedPlace._id}`} > */}
              <div key={this.state.selectedPlace._id} className="category-card" style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}>
                <div className="category-store-info">
                  <h4>{this.state.selectedPlace.name}</h4>
                  <p className="category-store-address">{this.state.selectedPlace.distance} meters</p>
                </div>
              </div>
            {/* </Link> */}
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

