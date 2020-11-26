import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import { SiInstacart } from "react-icons/si";
import { SiGooglecalendar } from "react-icons/si";
import { BsCameraVideoFill } from "react-icons/bs";

// import Calendar from './calendar';
// import Datetime from 'react-datetime';
// import './calendar.css';

class StoreDetails extends React.Component {
  state = {}

  componentDidMount() {
    this.getSingleStore();
  }

  getSingleStore = () => {
    const { params } = this.props.match;
    console.log("params", params)
    axios.get(`http://localhost:5000/api/stores/${params.id}`)
      .then(lookedUpStore => {
        this.setState(lookedUpStore.data);
      }).catch(err => console.log("Error on getting store details:", err))
  }

  render() {
    // Use store picture as background
    let background = this.state.picture

    return (
      <div className="page-container">
        <div className="top-detail-section"  style={{backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})`}}>
          <div className="relativeParent">
            <div className="detail-store-info">
              <h1>{this.state.fullName}</h1>
              <p className="nearby-store-address">{this.state.businessType}</p>
              <p className="nearby-store-address">{this.state.address}</p>
            </div>
          </div>
        </div>
        <div className="bottom-detail-section">
          <div className="tri-btn">
            <a>Conseils vidéo</a>
            <a>Prendre RDV</a>
            <a>Voir les produits</a>
          </div>
          <hr />
          <h3>Description</h3>
          <p>{this.state.description}</p>
        </div>
      </div>
    )
  }
}

export default StoreDetails