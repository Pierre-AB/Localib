import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';

class Splash extends Component {
  render() {
    return (
      <div className="splash-page">
        <h1>Welcome to Localib</h1>
        <p>Une super catchphrase qui tue sa mémère pour attirer tout le monde à utiliser notre appli</p>
        <Link className="btn green" to='/'>Les commerces autour de moi</Link>
        <Link className="btn dark" to='/'>Je suis un commerçant</Link>
      </div>
    );
  }
}

export default Splash;