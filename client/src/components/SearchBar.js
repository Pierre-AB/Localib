import React, { Component } from 'react';
import './SearchBar.css';
import { FaFilter } from "react-icons/fa";


function SearchBar(props) {
  return (
    <div className="SearchBar">
      <div className="searchbar-place-submit">
        <div className="searchbar-place">
          <div className="searchbar-place-input-wrapper">
            <div>
              <svg width="16" height="16" viewBox="0 0 16 16" className="searchbar-input-icon"><path fillRule="evenodd" clipRule="evenodd" d="M8 1.6a4.8 4.8 0 00-4.797 4.62L3.2 6.4c0 1.778.6 2.334 3.782 7.436a1.2 1.2 0 002.036 0l.952-1.516c2.307-3.648 2.81-4.31 2.83-5.824V6.4A4.8 4.8 0 008 1.6zm0 11.6L5.568 9.34C4.575 7.737 4.4 7.289 4.4 6.4a3.6 3.6 0 017.196-.17l.004.17c0 1.364-.38 1.636-3.6 6.8zM6 6.4a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>
              <input className="searchbar-input" placeholder="My address"/>
              <button className="searchbar-place-around-me-button dl-button" role="button" type="button">
                <span>
                  <svg className="searchbar-place-around-me-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
                  <span>Autour de moi</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="searchbar-query">
        <div>
          <div className="search-container">
            <svg width="16" height="16" viewBox="0 0 16 16" className="searchbar-input-icon"><path fillRule="evenodd" clipRule="evenodd" d="M14.312 13.322a.3.3 0 010 .425l-.564.565a.3.3 0 01-.425 0l-3.036-3.035a.307.307 0 01-.087-.212v-.33A5.2 5.2 0 011.6 6.8a5.2 5.2 0 015.2-5.2 5.2 5.2 0 013.935 8.6h.33c.08 0 .155.03.212.087l3.035 3.035zM6.8 10.8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path></svg>
            <input className="searchbar-input" placeholder="Search retailer or product" type="search" value={props.query} onChange={(e) => props.updateQuery(e.target.value)} />
            <div className="fa-filter"><FaFilter /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;