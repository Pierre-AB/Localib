import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import NearbyStores from '../components/Maps/NearbyStores'
import StoresByCategory from '../components/Maps/StoresByCategory'
import { Link /* , withRouter */ } from 'react-router-dom';


class Home extends Component {
  state = {
    query: '',
    isMobile: false
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }  

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({isMobile: window.innerWidth <= 992});
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }


  render() {
    return (
      <div>
        <div className={`${this.state.isMobile ? "page-container-mobile" : "page-container-desktop"}`}>
          {/* <SearchBar query={this.state.query} updateQuery={this.updateQuery} /> */}   
          <div className={`${this.state.isMobile ? "nearby-section-mobile" : "nearby-section-desktop"}`}>
            <h2>Nearby</h2>
 
            {/* {this.state.isMobile ? "" : (
              <Link to='/mapView'>
              <div className="nearby-card-desktop float-left" >
              <img className="nearby-card-desktop" src={`https://images.pexels.com/photos/702251/pexels-photo-702251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`} />
                <div className="nearby-store-info-desktop">
                  <h4 className="nearby-store-title">See shops around me</h4>
                </div>
              </div>
            </Link>
            )} */}

            <NearbyStores />

            {this.state.isMobile ? (
              <Link to='/mapView'><button>See shops around me</button></Link>
            ) : ""}
            
          </div>
          <div>
            <h2>By categories</h2>
            <StoresByCategory title="Alimentation" category="Alimentation"/>
            <StoresByCategory title="Epicerie et boissons" category="Epicerie-et-boissons"/>
            {/* <StoresByCategory title="Informatique" category="Informatique"/>
            <StoresByCategory title="Puériculture et jouets" category="Puériculture-et-jouets"/>
            <StoresByCategory title="Bricolage" category="Bricolage"/>
            <StoresByCategory title="Beauté, santé et bien-être" category="Beauté-santé-et-bien-être"/>
            <StoresByCategory title="Vêtements, chaussures et bijoux" category="Vêtements-chaussures-bijoux"/>
            <StoresByCategory title="Sports et loisirs" category="Sports-loisirs"/> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;