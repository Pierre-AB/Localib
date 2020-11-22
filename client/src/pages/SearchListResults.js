import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'

class SearchListResults extends Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div>
        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        Search List Results
      </div>
    );
  }
}

export default SearchListResults;