import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import Calendar from 'react-calendar';
import AppointmentPicker from './AppointmentPicker';
// import { SiInstacart } from "react-icons/si";
// import { SiGooglecalendar } from "react-icons/si";
// import { BsCameraVideoFill } from "react-icons/bs";
// import { DefaultLoadingElement } from '@react-google-maps/api/dist/LoadScript';

// import Calendar from './calendar';
// import Datetime from 'react-datetime';
// import './calendar.css';




//Name for the date
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//APPOINTMENT PICKER INSTANCE


//CONVERT DATE IN STRING

function dateName(dateName) {
  let dayNameIndex = dateName.getDay();
  let dayDate = dateName.getDate();
  let MonthNameIndex = dateName.getMonth()
  return `${days[dayNameIndex]} ${dayDate} ${months[MonthNameIndex]}`
}

//Calculate the Time Remaining
function compareDate(date) {
  const total = Date.parse(date) - Date.parse(new Date());
  // const seconds = Math.floor((total / 1000) % 60);
  // const minutes = Math.floor((total / 1000 / 60) % 60);
  // const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total,
    days
    // hours,
    // minutes,
    // seconds
  };
}





class StoreDetails extends React.Component {

  state = {
    store: {},
    pickedDate: new Date(),
    today: new Date(),
    fullDayName: dateName(new Date()),
    dayAvailibility: {},
    isLoaded: false
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
        this.setState({
          store: lookedUpStore.data,
          isLoaded: true
        });
      }).catch(err => console.log("Error on getting store details:", err))
  }


  // GET SELECTED DAY WRITTEN && SELECTED DAY AVAILABILITY

  handleChange = (clickedDate) => {
    // format day to match DataBase

    let dayOffset = compareDate(clickedDate);
    let dayString = dateName(clickedDate)
    let matchDay = clickedDate.getDay()

    const avaiForPickedDay = this.state.store.openingHours.filter(open =>
      open.day === matchDay
    )

    // let todayAvail = this.state.store.openingHours[matchDay];

    console.log('DayOffset=', dayOffset.days)

    if (dayOffset.days === -1) {
      dayString = 'Today'
    }

    console.log("MatchDay=", matchDay)

    console.log("avaiForPickedDay=", avaiForPickedDay[0])



    this.setState({
      pickedDate: clickedDate,
      fullDayName: dayString,
      dayAvailibility: avaiForPickedDay[0]
    })
    // console.log('This.state.pickedDate =', this.state.pickedDate)
    // console.log('This.state.day =', this.state.day)
  }



  render() {

    // Use store picture as background
    let background = this.state.picture
    const isLoaded = this.state.isLoaded
    return (

      <div>

        <div className="page-container">
          <div className="top-detail-section" style={{ backgroundImage: `linear-gradient(0deg, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 0.2)), url(${background})` }}>
            <div className="relativeParent">
              <div className="detail-store-info">
                <h1>{this.state.store.fullName}</h1>
                <p className="nearby-store-address">{this.state.store.businessType}</p>
                <p className="nearby-store-address">{this.state.store.address}</p>
              </div>
            </div>
          </div>
          <div className="bottom-detail-section">
            <div className="tri-btn">
              <a href='#'>Conseils vidéo</a>
              <a href='#'>Prendre RDV</a>
              <a href='#'>Voir les produits</a>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{this.state.store.description}</p>
          </div>
          <Calendar
            // activeStartDate
            onChange={this.handleChange}
            pickedDate={this.state.pickedDate}
            showNeighboringMonth={false}
          // tileClassName={tileClassName}
          />
          <h3>{this.state.fullDayName}</h3>
          {/* <AppointmentPicker store={this.state.store} pickedDate={this.state.pickedDate} /> */}

          {isLoaded ?
            (<AppointmentPicker store={this.state.store} pickedDate={this.state.pickedDate} dayAvailibility={this.state.dayAvailibility} />)
            :
            (<div>"loading..."</div>)}
        </div>

      </div>

    )
  }
}

export default StoreDetails