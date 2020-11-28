import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import NearbyStores from '../components/Maps/NearbyStores'
import StoresAlimentation from '../components/Maps/StoresAlimentation'
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
        List results
      </div>
    );
  }
}

export default SearchListResults;