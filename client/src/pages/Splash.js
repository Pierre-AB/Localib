import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';

import { Link } from 'react-router-dom';

class Splash extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="splash-page">
        <h1>Welcome to Localib</h1>
        <p>Une super catchphrase qui tue sa mémère pour attirer tout le monde à utiliser notre appli</p>
        <Link to='#' className="btn green" >LES COMMERCES AUTOUR DE MOI</Link>
        <Link to={'/signup'} className="btn dark" params={{ type: "store" }} className="below-nav">JE SUIS UN COMMERCANT</Link>
      </div>
    );
  }
}

export default Splash;