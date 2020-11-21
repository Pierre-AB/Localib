import React, { Component } from 'react';
import './SearchBar.css';
import { FaFilter } from "react-icons/fa";

function SearchBar(props) {
  return (
    <div className="search-container SearchBar">
      <input placeholder="Search retailer or product" type="search" value={props.query} onChange={(e) => props.updateQuery(e.target.value)} />
      <div className="fa-filter"><FaFilter /></div>
    </div>
  );
}

export default SearchBar;