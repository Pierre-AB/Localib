import React, { Component } from 'react';
import { FaCheckCircle } from "react-icons/fa";

class Success extends Component {
  render() {
    return (
      <div className="success-page page-container flex-column middle">
        <FaCheckCircle />
        <h1>Success Message</h1>
        <p>{this.props.msg}Lorem ipsum</p>
        <div className="btn-container">
          <button>Go back home</button>
        </div>
      </div>
    );
  }
}

export default Success;