import React, { Component } from 'react';

import SearchBar from '../components/SearchBar'
import SearchList from '../components/Maps/SearchList'


class SearchListResults extends Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div className="page-container-mobile">
        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        <SearchList query={this.state.query} />
      </div>
    );
  }
}

export default SearchListResults;