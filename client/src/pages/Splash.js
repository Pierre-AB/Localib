import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';



class Splash extends Component {
  state = {
    isMobile: false
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

  render() {
    return (
      <>
        {/* BOTH MOBILE & DESKTOP VERSION */}
        <div className={`${this.state.isMobile ? "splash-page-mobile" : "splash-page-desktop"}`}>

          {/* ONLY ON DESKTOP VERSION */}
          <div className="desktop-only splash-desktop">
            <img src={`https://images.pexels.com/photos/702251/pexels-photo-702251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}/>
          </div>

          {/* BOTH DESKTOP & MOBILE */}
          <div className="splash-mobile">
          <h1>Welcome to Localib</h1>
          <p>Une super catchphrase qui tue sa mémère pour attirer tout le monde à utiliser notre appli</p>
          <Link to='/mapView' className="btn green" >LES COMMERCES AUTOUR DE MOI</Link>
          <Link to={'/signup'} className="btn dark" params={{ type: "store" }}>JE SUIS UN COMMERCANT</Link>
          </div>

        </div>
      </>
    );
  }
}

export default Splash;