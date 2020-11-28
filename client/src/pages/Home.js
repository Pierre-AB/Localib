import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import NearbyStores from '../components/Maps/NearbyStores'
import StoresByCategory from '../components/Maps/StoresByCategory'


class Home extends Component {
    state = {
      query: ''
    }
  
    updateQuery = (newValue) => {
      this.setState({query: newValue});
    }  

  render() {
    return (
      <div>
        <div className="page-container">
          <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
          <div className="nearby-section">
            <h2>Nearby</h2>
            <NearbyStores />
            <button>See shops around me</button>
          </div>
          <div className="categories-section">
            <h2>By categories</h2>
            <StoresByCategory title="Alimentation" category="Alimentation"/>
            <StoresByCategory title="Epicerie et boissons" category="Epicerie-et-boissons"/>
            <StoresByCategory title="Informatique" category="Informatique"/>
            <StoresByCategory title="Puériculture et jouets" category="Puériculture-et-jouets"/>
            <StoresByCategory title="Bricolage" category="Bricolage"/>
            <StoresByCategory title="Beauté, santé et bien-être" category="Beauté-santé-et-bien-être"/>
            <StoresByCategory title="Vêtements, chaussures et bijoux" category="Vêtements-chaussures-bijoux"/>
            <StoresByCategory title="Sports et loisirs" category="Sports-loisirs"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;