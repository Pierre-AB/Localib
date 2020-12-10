import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useRouteMatch } from "react-router-dom";

//Import Logo
import { ReactComponent as Logo } from './logo.svg';

// Import Font Icon
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import SearchBar from './SearchBar';

// Configure mobile nav buttons
const mobileNav = [{
  route: "/home",
  icon: FaHome,
  label: "Home"
},{
  route: "/listSearch",
  icon: FaSearch,
  label: "Search"
},{
  route: "/mapView",
  icon: FaMap,
  label: "MapView"
},{
  route: "/cart",
  icon: FaShoppingCart,
  label: "Cart"
},{
  route: "/userSettings",
  icon: FaCog,
  label: "Settings"
}]


// // Test URL to hide searchbar component on the nav
// function DisplaySearchBar() {
//   let match = useRouteMatch("/mapView");

//   if (match) {
//     // If URL match
//     return <SearchBar query={props.query} updateQuery={props.updateQuery} />;
//   } else {
//     return <div />
//   }
// }


// Display nav
function Navigation (props) {

  // // Test URL to hide searchbar component on the nav
  // function DisplaySearchBar() {
  //   let match = useRouteMatch("/mapView");
  
  //   if (match) {
  //     // If URL match
  //     return <SearchBar query={props.query} updateQuery={props.updateQuery} />;
  //   } else {
  //     return <div />
  //   }
  // }

  return(
    <>
      {/* Desktop Nav */}
      <nav className="navbar desktop" role="navigation">
        <div className="nav-container">
          <Link to='/' className="navbar-logo">
            <Logo />
          </Link>
          {/* <DisplaySearchBar /> */}
          <div className="nav-menu">
            <ul>
              <li className="nav-link"><Link to='/home'>Home</Link></li>
              <li className="nav-link"><Link to='/mapView'>Stores</Link></li>
              <li className="nav-link"><Link to='/cart'>Cart</Link></li>
              <li className="nav-link"><Link to='/userSettings'>Settings</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="navbar mobile" role="navigation">
        <div className="nav-container">
          {
            mobileNav.map((tab, index) =>(
              <div className="nav-item" key={`tab-${index}`}>
                <Link to={tab.route}>
                  <div className="nav-link">
                    <tab.icon/>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </nav>
    </>
  )
};

export default Navigation;