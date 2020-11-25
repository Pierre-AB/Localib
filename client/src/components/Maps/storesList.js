import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { GeolocatedProps, geolocated } from "react-geolocated";
import Geolocated from './geolocated';
import service, { storesDistance } from './map-service'


class storesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [],
      latitude: "",
      longitude: ""
    };
    this.askLocation = this.askLocation.bind(this);
    // this.getCoordinates = this.getCoordinates.bind(this);
    // this.getAllStores = this.getAllStores.bind(this);
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

  // getCoordinates(position){
  //   this.setState({
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude
  //   })
  //   this.getAllStores();
  // }


  // getAllStores() {
  //   // const locationMaintenant = navigator.geolocation.getCurrentPosition()
  //   // console.log("😀", locationMaintenant)
  //   // this.getCoordinates(navigator.geolocation.getCurrentPosition(position))
  //   // axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}}`)  
  //   axios.get(`http://localhost:5000/api/stores/distances/48.794850700000005,2.4614814`)
  //   .then(responseFromApi => {
  //   this.setState({
  //       listOfStores: responseFromApi.data
  //     })
  //   })
  // }

  componentDidMount() {
    this.askLocation()
  }



  render() {
    return (

      <div>
        <h1>Storeslist</h1>
        <div className="media">
          {this.state.listOfStores.length <= 0 && "Loading stores . . . "}
          {this.state.listOfStores.map(store => {
            return (
              <div key={store._id}>
                <Link to={`/storeDetails/${store._id}`} ><img src={store.picture} width="64" height="64"></img></Link>
                <div className="media-body">
                  <Link to={`/storeDetails/${store._id}`} className="TextLink"><h2 className="mt-0">{store.fullName}</h2></Link>
                  <h3>{store.address}</h3>
                  <h3>{store.distance} meters</h3>
                  <h4>{store.businessType}</h4>
                  <p>Latitude : {store.location.coordinates[1]}</p>
                  <p>Longitude: {store.location.coordinates[0]}</p>

                </div>
              </div>
            )
          })
          }
        </div>
      </div>

    )
  }
}
export default storesList


