import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GeolocatedProps, geolocated } from "react-geolocated";
import Geolocated from './geolocated';



class storesList extends Component {
  constructor(props){
      super(props);
      this.state = { listOfStores: [] };
  }


  getAllStores = () => {
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
      <div style={{width: '60%', float:"left"}}>
              {this.state.listOfStores.length <= 0 && "Loading stores . . . "}
              {this.state.listOfStores.map( store => {
            return (
              <div key={store._id}>
               <img src={store.picture}></img>
                 <h2>{store.fullName}</h2>
                 <h3>{store.address}</h3>
                 <h3>{store.distance} meters</h3>
                 <h4>{store.businessType}</h4>
               </div>
              )})
          }
      </div>
  </div>

    )
  }
}
export default storesList


