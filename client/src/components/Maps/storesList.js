import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { GeolocatedProps, geolocated } from "react-geolocated";
import Geolocated from './geolocated';
import service, {storesDistance} from './map-service'


class storesList extends Component {
  constructor(props){
      super(props);
      this.state = { 
        listOfStores: [],
        latitude: "48.794850700000005",
        longitude: "2.4614814"
       };
      this.getLocation = this.getLocation.bind(this);
      this.getCoordinates = this.getCoordinates.bind(this);
      this.getAllStores = this.getAllStores.bind(this);

      
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates())
    } else {
      alert("Please turn on your geolocalisation")
    }
  }

  getCoordinates(position){
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.getAllStores();
  }

  getAllStores() {
    // axios.get(`http://localhost:5000/api/stores/distances/${this.state.latitude},${this.state.longitude}}`)  
    // storesDistance()
    axios.get(`http://localhost:5000/api/stores/distances/48.794850700000005,2.4614814`)
    .then(responseFromApi => {
    this.setState({
        listOfStores: responseFromApi.data
      })
    })
  }


  componentDidMount() {
    this.getAllStores();
  }


  render(){
    return(

      <div>
      <h1>Storeslist</h1>
      <div className="media">
              {this.state.listOfStores.length <= 0 && "Loading stores . . . "}
              {this.state.listOfStores.map( store => {
            return (
              <div key={store._id}>
               <img src={store.picture} width="64" height="64"></img>
                <div className="media-body">
                  <h2 className="mt-0">{store.fullName}</h2>
                  <h3>{store.address}</h3>
                  <h3>{store.distance} meters</h3>
                  <h4>{store.businessType}</h4>
                 </div>
               </div>
              )})
          }
      </div>
  </div>

    )
  }
}
export default storesList


