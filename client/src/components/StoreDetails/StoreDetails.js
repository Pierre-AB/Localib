import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import Calendar from 'react-calendar';
import AppointmentPicker from './AppointmentPicker';
import StoreMap from '../Maps/storeMap'
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

// Calculate Number of timeslot available per opening range
// CREATE SLOT ARRAYS
function timeSlotCalc(openingTime, closingTime, timeStep) {

  //                      [10, 0] , [12, 15], 10

  var timeSlotArray = [];

  if (!openingTime) {
    return timeSlotArray
  }

  let openingHours = Number(openingTime[0]) * 60; // 600
  let openingMinutes = Number(openingTime[1]); // 0
  let openingTotal = openingHours + openingMinutes; // 600

  let closingHours = Number(closingTime[0]) * 60; // 720
  let closingMinutes = Number(closingTime[1]); // 15
  let closingTotal = closingHours + closingMinutes; // 735

  let openingDifference = Math.abs(closingTotal - openingTotal); //Number of Minutes the store is open. -> (735 - 600) = 135 Minutes

  let timeslotNumber = Math.floor(openingDifference / timeStep); // 135 / 10 = 13,5.Floor = 13

  // Create the time slot Array
  // Once I have the number of timeSlot I need to add on the opening hour the slot timeRange
  var timeString = "";

  timeSlotArray.push()

  var startTime = openingTotal;

  for (let i = 0; i < timeslotNumber; i++) {
    let slot = startTime + timeStep // 600 + 10 = 610 -> i = 0
    let startHour = slot / 60 // 610 / 60 = 10,16
    let rStartHour = Math.floor(startHour) // 10
    let startMinutes = (startHour - rStartHour) * 60//  (10,16 - 10) * 60 =  10
    let rStartMinutes = Math.round(startMinutes) // 10

    timeString = "" + rStartHour + ":" + rStartMinutes

    timeSlotArray.push(timeString);
    startTime = slot
  }

  console.log("🥇 timeSlotArray =", timeSlotArray)

  return timeSlotArray;
}






//  ######   #######  ##     ## ########   #######  ##    ## ######## ##    ## ######## 
// ##    ## ##     ## ###   ### ##     ## ##     ## ###   ## ##       ###   ##    ##    
// ##       ##     ## #### #### ##     ## ##     ## ####  ## ##       ####  ##    ##    
// ##       ##     ## ## ### ## ########  ##     ## ## ## ## ######   ## ## ##    ##    
// ##       ##     ## ##     ## ##        ##     ## ##  #### ##       ##  ####    ##    
// ##    ## ##     ## ##     ## ##        ##     ## ##   ### ##       ##   ###    ##    
//  ######   #######  ##     ## ##         #######  ##    ## ######## ##    ##    ##    




class StoreDetails extends React.Component {

  state = {
    store: {},
    pickedDate: new Date(),
    today: new Date(),
    fullDayName: dateName(new Date()),
    dayAvailibility: {},
    storeIsLoaded: false,
    timeSlot: 15
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
          storeIsLoaded: true
        });
      }).catch(err => console.log("Error on getting store details:", err))
  }


  // GET SELECTED DAY WRITTEN && SELECTED DAY AVAILABILITY

  handleChange = (clickedDate) => {
    // format day to match DataBase

    let dayOffset = compareDate(clickedDate);
    let dayString = dateName(clickedDate);
    let matchDay = clickedDate.getDay();

    const avaiForPickedDay = this.state.store.openingHours.filter(open =>
      open.day === matchDay
    )

    console.log("avaiForPickedDay[0]=", avaiForPickedDay[0])
    console.log("avaiForPickedDay=", avaiForPickedDay)
    // let todayAvail = this.state.store.openingHours[matchDay];

    console.log('DayOffset=', dayOffset.days)

    if (dayOffset.days === -1) {
      dayString = 'Today'
    }

    this.setState({
      pickedDate: clickedDate,
      fullDayName: dayString,
      dayAvailibility: avaiForPickedDay[0]
    }, this.splitDay);


  }


  splitDay = () => {
    let dayAvaiArr = [];

    // check closed hours
    if (!this.state.dayAvailibility.openAm) {
      return dayAvaiArr;
    }

    let openAm = this.state.dayAvailibility.openAm; // coming from state after click on calendar
    let closeAm = this.state.dayAvailibility.closeAm;
    let openPm = this.state.dayAvailibility.openPm;
    let closePm = this.state.dayAvailibility.closePm;


    // get opening hours as an array
    let strOpenAm = openAm.split(":");
    let strCloseAm = closeAm.split(":");

    //calc number of slot per opening hours
    let morningAvaiSlotNum = timeSlotCalc(strOpenAm, strCloseAm, this.state.timeSlot);



    //check if not open on the afternoon
    if (openPm) {
      let strOpenPm = openPm.split(":");
      let strClosePm = closePm.split(":");
      let afternoonAvaiSlotNum = timeSlotCalc(strOpenPm, strClosePm, this.state.timeSlot);
      dayAvaiArr.push(morningAvaiSlotNum, afternoonAvaiSlotNum);
    } else {
      dayAvaiArr.push(morningAvaiSlotNum);
    }

    console.log("dayAvaiArr=", dayAvaiArr)


    return dayAvaiArr;
  }


  render() {

    // Use store picture as background
    let background = this.state.picture;
    const storeIsLoaded = this.state.storeIsLoaded;
    // const availabilityloaded
    const dayInfo = this.splitDay();



    return (

      <div>

        <div className="page-container-mobile">
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

          {storeIsLoaded ? (
            <div>
            <AppointmentPicker store={this.state.store} pickedDate={this.state.pickedDate} dayAvailibility={this.state.dayAvailibility} dayAvaiArr={dayInfo} />
            <StoreMap store={this.state.store}/>
            </div>
            )
            :
            (<div>"loading..."</div>)}
        </div>

      </div>

    )
  }
}

export default StoreDetails