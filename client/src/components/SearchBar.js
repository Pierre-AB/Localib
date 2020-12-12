import React from 'react';
import './SearchBar.css';
import { FaFilter } from "react-icons/fa";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';

//const apiKey = "AIzaSyAVzE_dUQuFDCTq5dXGYztOiz4YJbe4yjM" 
const apiKey = `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressValue: "",
      isMobile: false

    };
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

  displayAddressInput() {
    let AddressInput = document.getElementById("mobile-address-input");
    let ProductInput = document.getElementById("mobile-product-input");
    let MagnifierPicto = document.getElementById("mobile-magnifier-input");
    if (AddressInput.style.display === "none") {
      AddressInput.style.display = "block";
      ProductInput.style.display = "none";
      MagnifierPicto.style.display = "none";
    } else {
      AddressInput.style.display = "none";
      ProductInput.style.display = "block";
      MagnifierPicto.style.display = "block";
    }
  }

  onSelectFunction(addressValue) {
     this.setState({ addressValue });
     this.props.handleSelect(addressValue)
  }

  render() {
    //we can change the style: https://developers.google.com/maps/documentation/javascript/places-autocomplete#style-autocomplete
    const renderInput = (({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
  <div>
      <input {...getInputProps()} className="searchbar-input" id="mobile-address-input" style={this.state.isMobile ? {display:"none"} : {display:"block"}} placeholder="My address"/>

      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          // inline style for demonstration purpose
          const style = suggestion.active
            ? { backgroundColor: '#baceac', cursor: 'pointer' } //#fafafa
            : { backgroundColor: '#ffffff', cursor: 'pointer' }; //#ffffff
          return (
            <div
              {...getSuggestionItemProps(suggestion, {
                className,
                style,
              })}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
  </div>
  )
    );

      return (
      <div className="SearchBar searchbar-desktop-position">
        <div className="searchbar-place-submit">
          <div className="searchbar-place">
            <div className="searchbar-place-input-wrapper">
              <div>
              <PlacesAutocomplete
                className="searchbar-input"
                value={this.state.addressValue}
                onChange={addressValue => {this.setState({ addressValue })}}
                onSelect={adresseValue => {this.onSelectFunction(adresseValue)}}
                searchOptions={{componentRestrictions: { country: ['fr'] }}
                }
              >

                  {renderInput}

              </PlacesAutocomplete>                
                <span onClick={this.state.isMobile ? this.displayAddressInput : ""} className="searchbar-input-icon"><svg width="16" height="16" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 1.6a4.8 4.8 0 00-4.797 4.62L3.2 6.4c0 1.778.6 2.334 3.782 7.436a1.2 1.2 0 002.036 0l.952-1.516c2.307-3.648 2.81-4.31 2.83-5.824V6.4A4.8 4.8 0 008 1.6zm0 11.6L5.568 9.34C4.575 7.737 4.4 7.289 4.4 6.4a3.6 3.6 0 017.196-.17l.004.17c0 1.364-.38 1.636-3.6 6.8zM6 6.4a2 2 0 114 0 2 2 0 01-4 0z"></path></svg></span>
                <button onClick={this.props.searchAroundMe} className="searchbar-place-around-me-button dl-button" role="button" type="button">
                  <span style={this.state.isMobile ? {display:"none"} : {display:"block"}}>
                    <svg className="searchbar-place-around-me-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
                    {/* <span>Autour de moi</span> */}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="searchbar-query">
          <div>
            <div className="search-container">
              <svg id="mobile-magnifier-input" width="16" height="16" viewBox="0 0 16 16" className="searchbar-input-icon"><path fillRule="evenodd" clipRule="evenodd" d="M14.312 13.322a.3.3 0 010 .425l-.564.565a.3.3 0 01-.425 0l-3.036-3.035a.307.307 0 01-.087-.212v-.33A5.2 5.2 0 011.6 6.8a5.2 5.2 0 015.2-5.2 5.2 5.2 0 013.935 8.6h.33c.08 0 .155.03.212.087l3.035 3.035zM6.8 10.8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path></svg>
              <input id="mobile-product-input" className="searchbar-input" placeholder="Search retailer or product" type="search" value={this.props.query} onChange={(e) => this.props.updateQuery(e.target.value)} />
              <div className="fa-filter"><FaFilter /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey })(SearchBar); 