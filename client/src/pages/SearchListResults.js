import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import NearbyStores from '../components/Maps/NearbyStores'
import StoresByCategory from '../components/Maps/StoresByCategory'

class SearchListResults extends Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div className="page-container">
        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        <div className="nearby-section">
          <h2>Nearby</h2>
          <NearbyStores />
          <button>See shops around me</button>
        </div>
        <div className="categories-section">
          <h2>By categories</h2>
          <StoresByCategory />
        </div>
      </div>
    );
  }
}

export default SearchListResults;