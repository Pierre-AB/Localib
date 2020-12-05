import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import mapStyles from "./mapStyles";


// Loader Icon
import { useLoading, ThreeDots } from '@agney/react-loading';

const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" // process.env.GOOGLE_MAPS_API_KEY; // "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM"


class SearchMapList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      listOfProducts: [],
      latitude: "",
      longitude: "",
      selected: null, 
      mapLoaded: false, 
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.askLocation = this.askLocation.bind(this);
  }

  startApp() {
    this.getLocation();
  }

  askLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        console.log('success geoloc 🗺', pos)
        // success
        this.setState({
          latitude: lat,
          longitude: lng,
          mapLoaded: true
        })
        axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}`)

          .then(responseFromApi => {
            this.setState({
              listOfStores: responseFromApi.data
            })
          })
      })
    } else {
      alert("Please turn on your geolocalisation")
    }
  }


  // Bring the products data
  getProducts = () => {
    axios
      .get(`http://localhost:5000/api/products`)
      .then((productsFromDb) => {
        const allProducts = productsFromDb.data;
        this.setState({
          listOfProducts: allProducts,
          latitude: this.state.latitude,
          longitude: this.state.longitude
        })
        console.log("list of Products", this.state.listOfProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.askLocation()
    this.getProducts()
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true, 
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render(){ 
    // Let's filter the name before rendering 
    const onNameFilter = this.state.listOfStores.filter(store => {
      // does the store's name matches the query ?
      const matchName = (store.fullName).toLowerCase().includes((this.props.query).toLowerCase());
      return matchName;
    })


    // Let's filter the products before rendering

    // Make an array of products matching
    let ProductFilteredStoreId = []

    const onProductFilter = this.state.listOfProducts.filter(product => { // [array de store ID contenant camemberts]
      // does the store's have the product match in the query ?
      const matchProduct = (product.name).toLowerCase().includes((this.props.query).toLowerCase());
      return matchProduct;
    })

    // Matching store ID of products and store ID of stores
    onProductFilter.forEach(product => { // Boucle sur chaque produit
      this.state.listOfStores.forEach(store => { // Boucle sur chaque store
        if (product.store_id && store._id) { // Ne compare pas les undefined
          if (product.store_id === store._id) { // Si store ID = store ID
            ProductFilteredStoreId.push(store) // push dans ProductFilteredStoreId array
          }
        }
      })   
    })   

    // Switch rendering regarding content of the search bar
    let renderedList;

    if (this.props.query.length !== "") {
      renderedList = [...onNameFilter, ...ProductFilteredStoreId]
    } else { // Par défaut, renvoie full listOfStores
      renderedList = this.state.listOfStores
    }

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

    const selectedIcon = {
      url: `https://picsum.photos/64`,
      origin: new window.google.maps.Point(0, 0),
      scaledSize: new window.google.maps.Size(45, 60),
    }
    
    //pour vérifier si la carte a été chargée
    const mapLoaded = this.state.mapLoaded;
    

    return(
      <>
        <div className="vertical-scroll-container">

          {/* Loading stores message */}
          {renderedList.length <= 0 && <ThreeDots width="30" />}

          {/* Display stores when loaded */}
          {renderedList.map(store => {

            // Use store picture as background
            let background = store.picture
            
            return (
              <Link to={`/storeDetails/${store._id}`} >
                <div key={store._id} className="vertical-list">
                  <div className="vertical-list-image" style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}></div>
                  <div className="vertical-store-info">
                    <h4>{store.fullName}</h4>
                    <p className="vertical-store-address">{store.address}</p>
                    <p className="vertical-store-address">{store.distance} meters</p>
                  </div>
                </div>
                <hr />
              </Link>
            )
          })
          }

          <div>
            {
              mapLoaded ? // la carte a été chargée ?
              // alors retourne: 
              <div>
              <Map
                google={this.props.google}
                styles={this.props.mapStyle}
                zoom={16}
                options={options}
                onClick={
                  this.onMapClicked
                  }
                initialCenter={{ 
                  lat: this.state.latitude,  
                  lng: this.state.longitude
                  }}
              >
              {renderedList.map(store => {
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
            }
          </div>

        </div>
      </>
    )
  }
}
SearchMapList.defaultProps = mapStyles;

export default GoogleApiWrapper({
  apiKey
  })(SearchMapList);