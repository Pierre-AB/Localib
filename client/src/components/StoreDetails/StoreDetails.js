import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import Calendar from 'react-calendar';

// import Calendar from './calendar';
// import Datetime from 'react-datetime';
// import './calendar.css';


var wordDay = ''
function nameDate(dayNumber) {
  switch (dayNumber) {
    case 1:
      return wordDay = 'Monday';
    case 2:
      return wordDay = 'Tuesday';
    case 3:
      return wordDay = 'Wednesday';
    case 4:
      return wordDay = 'Thursday';
    case 5:
      return wordDay = 'Friday';
    case 6:
      return wordDay = 'Saturday';
    case 7:
      return wordDay = 'Sunday';
    default:
      return console.log("🚨 impossible date picked")
  }
}



class StoreDetails extends React.Component {

  state = {
    store: {},
    pickedDate: new Date(),
    day: '',
    openinghours: {}
  }

  componentDidMount() {
    this.getSingleStore();
    this.setState({ day: nameDate(new Date().getDay()) })
  }

  // GET STORE DETAILS

  getSingleStore = () => {
    const { params } = this.props.match;
    console.log("params", params)
    axios.get(`http://localhost:5000/api/stores/${params.id}`)
      .then(lookedUpStore => {
        this.setState({ store: lookedUpStore.data });
      }).catch(err => console.log("Error on getting store details:", err))
  }


  // GET SELECTED DAY

  handleChange = (clickedDate) => {
    // format day to match DataBase
    let realDay = clickedDate.getDay() + 1
    nameDate(realDay);

    this.setState({
      pickedDate: clickedDate,
      day: wordDay
    })
    console.log('This.state.pickedDate =', this.state.pickedDate)
    console.log('This.state.day =', this.state.day)
  }


  //APPOINTMENTS

  /*
  - Faire coincider le jour choisi avec les horaires d'ouvertures de ce store.
  - Afficher les horaires d'ouverture du jour choisis.
  - Afficher les créneaux disponibles pour un rendez-vous ce jour en question.
  */

  render() {



    return (
      <div>
        <div className="below-nav">
          <img src={this.state.store.picture} alt={this.state.fullName} />
          <h1>{this.state.store.fullName}</h1>
          <p>{this.state.store.description}</p>
          <p>{this.state.store.address}</p>
          <div className="">
            <div className="">
              <Calendar
                // activeStartDate
                onChange={this.handleChange}
                pickedDate={this.state.pickedDate}
              />
              <h3>{this.state.day}</h3>
              <h3>{this.state.openinghours.day}</h3>

            </div>
          </div>

          {/* </div > */}

        </div>


      </div>
    )
  }

}

export default StoreDetails