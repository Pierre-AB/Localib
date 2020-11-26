import React from 'react';
import axios from 'axios';
import './StoreDetails.css';

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
    return (
      <div>
        <div className="below-nav">
          <img src={this.state.picture} alt={this.state.fullName} />
          <h1>{this.state.fullName}</h1>
          <p>{this.state.description}</p>
          <p>{this.state.address}</p>

        </div>


      </div>
    )
  }

}

export default StoreDetails