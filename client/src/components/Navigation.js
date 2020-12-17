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
import { logout } from './auth/auth-service'
import { VscHome } from "react-icons/vsc";

// Configure mobile nav buttons
const mobileNav = [{
  route: "/home",
  icon: FaHome,
  label: "Home"
}, {
  route: "/listSearch",
  icon: FaSearch,
  label: "Search"
}, {
  route: "/mapView",
  icon: FaMap,
  label: "MapView"
}, {
  route: "/cart",
  icon: FaShoppingCart,
  label: "Cart"
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
class Navigation extends React.Component {

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
  render() {
    const loggedUser = this.props.loggedInUser

    return (
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
                <li className="nav-link"><Link to='/home'><VscHome /></Link></li>
                <li className="nav-link"><Link to='/mapView'>Les commerces</Link></li>
                {loggedUser ? (<>
                  <li className="nav-link"><Link to='/commandes'>Mes commandes</Link></li>
                  <li className="nav-link"><button className="logout-btn" onClick={(e) => { logout().then(() => this.props.updateUser(null)) }}><svg width="24" height="24"><g fill="none" fillRule="evenodd"><path stroke="#aeb5c5" d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"></path><path fill="#aeb5c5" d="M12.8 11l-2.15-2.15a.5.5 0 11.7-.7L14 10.79a1 1 0 010 1.42l-2.65 2.64a.5.5 0 01-.7-.7L12.79 12H4.5a.5.5 0 010-1h8.3z"></path></g></svg></button></li>
                </>) : (<>
                  <li className="nav-link"><Link to='/signup'>S'inscrire</Link></li>
                  <li className="nav-link"><Link to='/login'>Se connecter</Link></li>
                </>)}

                {/* <li className="nav-link"><Link to='/cart'>Cart</Link></li>
              <li className="nav-link"><Link to='/userSettings'>Settings</Link></li> */}
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className="navbar mobile" role="navigation">
          <div className="nav-container">
            {
              mobileNav.map((tab, index) => (
                <div className="nav-item" key={`tab-${index}`}>
                  <Link to={tab.route}>
                    <div className="nav-link">
                      <tab.icon />
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </nav>
      </>
    )
  }
}

export default Navigation;