import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";

class Success extends Component {
  render() {
    return (
      <div className="success-page page-container flex-column middle">
        <FaCheckCircle />
        <h1>Success Message</h1>
        <p>{this.props.msg}Lorem ipsum</p>
        <div className="btn-container">
          <Link to={`/home`} ><button>Go back home</button></Link>
        </div>
      </div>
    );
  }
}

export default Success;