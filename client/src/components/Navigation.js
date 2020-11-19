import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return(
    <nav className="navbar navbar-expand-md navbar-light sticky-top" role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/home">Brand</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/listSearch" className="nav-link">
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
  )
};

export default Navigation;