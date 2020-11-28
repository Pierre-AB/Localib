// Copy from storesList the 26/11

import React, { Component } from 'react';
import axios from 'axios';
import { Link /* , withRouter */ } from 'react-router-dom';
// import { GeolocatedProps, geolocated } from "react-geolocated";
// import Geolocated from './geolocated';
// import service, { storesDistance } from './map-service'


class StoresByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      latitude: "",
      longitude: ""
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
        axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}/category/${this.props.category}`)

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
  }

  render(){ 
    return(
      <>
        <h3>{this.props.title}</h3>
        <div className="horizontal-scroll-container">

          {/* Loading stores message */}
          {this.state.listOfStores.length <= 0 && "Loading stores . . . "}

          {/* Display stores when loaded */}
          {this.state.listOfStores.map(store => {

            // Use store picture as background
            let background = store.picture
            
            return (
              <Link to={`/storeDetails/${store._id}`} >
                <div key={store._id} className="category-card" style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}>
                  <div className="category-store-info">
                    <h4>{store.fullName}</h4>
                    <p className="category-store-address">{store.distance} meters</p>
                  </div>
                </div>
              </Link>
            )
          })
          }

        </div>
      </>
    )
  }
}
export default StoresByCategory;