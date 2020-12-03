// Copy from storesList the 26/11

import React, { Component } from 'react';
import axios from 'axios';
import { Link /* , withRouter */ } from 'react-router-dom';
// import { GeolocatedProps, geolocated } from "react-geolocated";
// import Geolocated from './geolocated';
// import service, { storesDistance } from './map-service'

// Loader Icon
import { useLoading, ThreeDots } from '@agney/react-loading';


class NearbyStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      latitude: "",
      longitude: "",
      isMobile: false
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
          longitude: lng
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

  componentDidMount() {
    this.askLocation()
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({isMobile: window.innerWidth <= 992});
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }



  render(){ 
    return(
      <div className={`${this.state.isMobile ? "horizontal-scroll-container" : "nearby-container-desktop"}`}>

        {/* Loading stores message */}
        {this.state.listOfStores.length <= 0 && <ThreeDots width="30" />}

        {/* Display stores when loaded */}
        {this.state.listOfStores.map(store => {

          // Use store picture as background
          let background = store.picture
          
          return (
            <Link to={`/storeDetails/${store._id}`} >
              <div key={store._id} className={`${this.state.isMobile ? "nearby-card-mobile" : "nearby-card-desktop"}`} style={this.state.isMobile ? { backgroundImage:`linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})` } : {}} >
                {this.state.isMobile ? "" : (<img className="nearby-card-desktop" src={`${background}`} />)}
                <div className={`${this.state.isMobile ? "nearby-store-info-mobile" : "nearby-store-info-desktop"}`}>
                  <h4 className="nearby-store-title">{store.fullName}</h4>
                  <p className="nearby-store-address">{store.address}</p>
                  <p className="nearby-store-address">{store.distance} meters</p>
                </div>
              </div>
            </Link>
          )
        })
        }

      </div>
    )
  }
}
export default NearbyStores;