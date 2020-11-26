import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import Calendar from 'react-calendar';

// import Calendar from './calendar';
// import Datetime from 'react-datetime';
// import './calendar.css';

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dateName(dateName) {
  let dayNameIndex = dateName.getDay();
  let dayDate = dateName.getDate();
  let MonthNameIndex = dateName.getMonth()
  return `${days[dayNameIndex]} ${dayDate} ${months[MonthNameIndex]}`
}

class StoreDetails extends React.Component {

  state = {
    store: {},
    pickedDate: new Date(),
    today: new Date(),
    fullDayName: dateName(new Date()),
  }

  componentDidMount() {
    this.getSingleStore();
    // let now = dateName(new Date())
    // this.setState({ fullDayName: now })
    console.log(this.state.today);
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

    // if (this.state.pickedDate.getDay() === this.state.today.getDay()) {
    //   this.setState({

    //   })
    // }
    this.setState({
      pickedDate: clickedDate,
      fullDayName: dateName(clickedDate)
    })
    // console.log('This.state.pickedDate =', this.state.pickedDate)
    // console.log('This.state.day =', this.state.day)
  }


  //APPOINTMENTS

  /*
  - Faire coincider le jour choisi avec les horaires d'ouvertures de ce store.
  - Afficher les horaires d'ouverture du jour choisis.
  - Afficher les créneaux disponibles pour un rendez-vous ce jour en question.
  */

  //ATTENTION ADD A STATE FOR THE DAY TO DETERMINE OPENING HOURS

  render() {


    console.log(this.state.pickedDate)
    console.log(this.state.today)


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
              <h3>{this.state.fullDayName}</h3>

              {/* <h3>{this.state.store.openingHours}</h3> */}

            </div>
          </div>

          {/* </div > */}

        </div>


      </div>
    )
  }

}

export default StoreDetails