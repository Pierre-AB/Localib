import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Splash extends Component {
  render() {
    return (
      <div>

        <Link to='#' className="below-nav">LES COMMERCES AUTOUR DE MOI</Link>
        <Link to={'/signup'} params={{ type: "store" }} className="below-nav">JE SUIS UN COMMERCANT</Link>
      </div>
    );
  }
}

export default Splash;