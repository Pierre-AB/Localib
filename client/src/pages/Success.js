import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";

class Success extends Component {
  render() {
    return (
      <div className="success-page page-container-mobile flex-column middle">
        <FaCheckCircle />
        <h1>Merci pour votre commande !</h1>
        <p>{this.props.msg}</p>
        <div className="btn-container">
          <Link to={`/home`} ><button> Retour à l'accueil</button></Link>
        </div>
      </div>
    );
  }
}

export default Success;