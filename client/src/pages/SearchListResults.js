import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import NearbyStores from '../components/Maps/NearbyStores'
import StoresAlimentation from '../components/Maps/StoresAlimentation'
import StoresEpicerieBoissons from '../components/Maps/StoresEpicerieBoissons'


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
          <StoresAlimentation />
          <StoresEpicerieBoissons />
        </div>
      </div>
    );
  }
}

export default SearchListResults;