import React from 'react';
import axios from 'axios';
import './StoreDetails.css';
import { Link } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import AppointmentPicker from './AppointmentPicker';
import StoreMap from '../Maps/storeMap'
import ListOfProducts from '../Products/listOfProducts'
// import { isThisISOWeek } from 'date-fns/esm';
// import { SiInstacart } from "react-icons/si";
// import { SiGooglecalendar } from "react-icons/si";
// import { BsCameraVideoFill } from "react-icons/bs";
// import { DefaultLoadingElement } from '@react-google-maps/api/dist/LoadScript';

// import Calendar from './calendar';
// import Datetime from 'react-datetime';
// import './calendar.css';




//Name for the date
// var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// //CONVERT DATE IN STRING
// function dateName(dateName) {
//   let dayNameIndex = dateName.getDay();
//   let dayDate = dateName.getDate();
//   let MonthNameIndex = dateName.getMonth()
//   return `${days[dayNameIndex]} ${dayDate} ${months[MonthNameIndex]}`
// }

// //Calculate the Time Remaining
// function compareDate(date) {
//   const total = Date.parse(date) - Date.parse(new Date());
//   // const seconds = Math.floor((total / 1000) % 60);
//   // const minutes = Math.floor((total / 1000 / 60) % 60);
//   // const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));
//   return {
//     total,
//     days
//     // hours,
//     // minutes,
//     // seconds
//   };
// }

// Calculate Number of timeslot available per opening range
// CREATE SLOT ARRAYS
// function timeSlotCalc(openingTime, closingTime, timeStep) {

//   //                      [10, 0] , [12, 15], 10

//   var timeSlotArray = [];

//   if (!openingTime) {
//     return timeSlotArray
//   }

//   let openingHours = Number(openingTime[0]) * 60; // 600
//   let openingMinutes = Number(openingTime[1]); // 0
//   let openingTotal = openingHours + openingMinutes; // 600

//   let closingHours = Number(closingTime[0]) * 60; // 720
//   let closingMinutes = Number(closingTime[1]); // 15
//   let closingTotal = closingHours + closingMinutes; // 735

//   let openingDifference = Math.abs(closingTotal - openingTotal); //Number of Minutes the store is open. -> (735 - 600) = 135 Minutes

//   let timeslotNumber = Math.floor(openingDifference / timeStep); // 135 / 10 = 13,5.Floor = 13

//   // Create the time slot Array
//   // Once I have the number of timeSlot I need to add on the opening hour the slot timeRange
//   var timeString = "";

//   timeSlotArray.push()

//   var startTime = openingTotal;

//   for (let i = 0; i < timeslotNumber; i++) {
//     let slot = startTime  // 600 + 10 = 610 -> i = 0
//     let startHour = slot / 60 // 610 / 60 = 10,16
//     let rStartHour = Math.floor(startHour) // 10
//     let startMinutes = (startHour - rStartHour) * 60//  (10,16 - 10) * 60 =  10
//     let rStartMinutes = Math.round(startMinutes) // 10

//     if (rStartMinutes.toString().length === 1) {
//       rStartMinutes = "0" + rStartMinutes.toString()
//     }

//     timeString = "" + rStartHour + ":" + rStartMinutes

//     timeSlotArray.push(timeString);
//     startTime = slot + timeStep
//   }

//   // console.log("🥇 timeSlotArray =", timeSlotArray)

//   return timeSlotArray;
// }






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
    orders: [],
    pickedDate: new Date(),
    today: new Date().getDate(),
    // fullDayName: dateName(new Date()),
    dayAvailibility: {},
    storeIsLoaded: false,
    timeSlot: 15,
    nonAvaiTime: [],
    listOfProducts: [],
    storeProducts: []
  }

  componentDidMount() {
    this.getSingleStore();
    this.getProducts();

    // const day = new Date().getDay();
    // this.setState({
    //   pickedDate: this.state.store.openingHours
    // })

  }

  //  $$$$$$\            $$\                                              $$\ $$\           
  // $$  __$$\           \__|                                             $$ |$$ |          
  // $$ /  $$ |$$\   $$\ $$\  $$$$$$\   $$$$$$$\        $$$$$$$\ $$$$$$\  $$ |$$ | $$$$$$$\ 
  // $$$$$$$$ |\$$\ $$  |$$ |$$  __$$\ $$  _____|      $$  _____|\____$$\ $$ |$$ |$$  _____|
  // $$  __$$ | \$$$$  / $$ |$$ /  $$ |\$$$$$$\        $$ /      $$$$$$$ |$$ |$$ |\$$$$$$\  
  // $$ |  $$ | $$  $$<  $$ |$$ |  $$ | \____$$\       $$ |     $$  __$$ |$$ |$$ | \____$$\ 
  // $$ |  $$ |$$  /\$$\ $$ |\$$$$$$  |$$$$$$$  |      \$$$$$$$\\$$$$$$$ |$$ |$$ |$$$$$$$  |
  // \__|  \__|\__/  \__|\__| \______/ \_______/        \_______|\_______|\__|\__|\_______/ 


  // GET STORE DETAILS

  getSingleStore = () => {
    const { params } = this.props.match;
    // console.log("params", params)
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/stores/${params.id}`)
      // axios.get(`http://localhost:5000/api/stores/${params.id}`)
      .then(lookedUpStore => {
        this.setState({
          store: lookedUpStore.data,
          storeIsLoaded: true
        });

      })
      .catch(err => console.log("Error on getting store details:", err))
  }

  getProducts = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((productsFromDb) => {
        const allProducts = productsFromDb.data;
        this.setState({
          listOfProducts: allProducts,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //GET BOOKED APPOINTMENTS

  // getBookedAppo = () => {
  //   let store = this.state.store._id
  //   // console.log("🏚 store/id=", store._id)
  //   axios.get(`http://localhost:5000/api/orders?storeId=${encodeURIComponent(store)}`) // QUERY STRING
  //     .then(response => {
  //       const ordersFromApi = response.data;
  //       console.log("⏰ ORDERS from API=", ordersFromApi);
  //       this.setState({
  //         orders: ordersFromApi
  //       }, this.dateToDisplay)

  //     })
  //     .catch(err => console.log(err))

  // }
  // // Temporary memory to implement
  // dateToDisplay = () => {
  //   if (this.state.pickedDate) {
  //     this.handleChange(this.state.pickedDate)
  //   } else {
  //     this.handleChange(new Date())
  //   }

  // }


  // CREATE ORDERS Here =  Appointment booking

  // createOrder = (time) => {
  //   const store_id = this.state.store._id;
  //   const appointmentDay = `${this.state.pickedDate.getFullYear()}-${this.state.pickedDate.getMonth() + 1}-${this.state.pickedDate.getDate()}`; // Record in server the date in a string format to avoid time offset due to local time from the browser
  //   const appointmentTime = time;
  //   const status = "confirmed"

  //   axios.post('http://localhost:5000/api/orders', { store_id, appointmentDay, appointmentTime, status })
  //     .then(response => {
  //       this.getBookedAppo()
  //       // console.log(response)
  //       // console.log("ORDER PASSED TO BACK");
  //     })
  //     .catch(err => console.log(err))


  // }

  //  $$$$$$\                                  $$\     $$\                               
  // $$  __$$\                                 $$ |    \__|                              
  // $$ /  \__|$$\   $$\ $$$$$$$\   $$$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\   $$$$$$$\ 
  // $$$$\     $$ |  $$ |$$  __$$\ $$  _____|\_$$  _|  $$ |$$  __$$\ $$  __$$\ $$  _____|
  // $$  _|    $$ |  $$ |$$ |  $$ |$$ /        $$ |    $$ |$$ /  $$ |$$ |  $$ |\$$$$$$\  
  // $$ |      $$ |  $$ |$$ |  $$ |$$ |        $$ |$$\ $$ |$$ |  $$ |$$ |  $$ | \____$$\ 
  // $$ |      \$$$$$$  |$$ |  $$ |\$$$$$$$\   \$$$$  |$$ |\$$$$$$  |$$ |  $$ |$$$$$$$  |
  // \__|       \______/ \__|  \__| \_______|   \____/ \__| \______/ \__|  \__|\_______/ 



  // GET SELECTED DAY WRITTEN && SELECTED DAY AVAILABILITY

  // handleChange = (clickedDate) => {
  //   // format day to match DataBase

  //   let dayOffset = compareDate(clickedDate);
  //   let dayString = dateName(clickedDate);
  //   let matchDay = clickedDate.getDay();

  //   const avaiForPickedDay = this.state.store.openingHours.filter(open =>
  //     open.day === matchDay
  //   )

  //   if (dayOffset.days === -1) {
  //     dayString = 'Today'
  //   }

  //   this.setState({
  //     pickedDate: clickedDate,
  //     fullDayName: dayString,
  //     dayAvailibility: avaiForPickedDay[0],
  //     centerCalendarDay: clickedDate.getDate()
  //   }, this.drawAvailability);


  // }


  // Show only available timeslot
  // drawAvailability = () => {

  //   var nonAvaiTimeArr = []


  //   // once all the orders from the selected store have been retrieved, filter the one matching with the pickedDate (clicked on the calendar)
  //   const ordersOnPickedDate = this.state.orders.filter(order => {
  //     const orderDate = new Date(order.appointmentDay) // need to translate the string into a date to apply a date related method
  //     const selectedDate = this.state.pickedDate
  //     return orderDate.getFullYear() === selectedDate.getFullYear() && orderDate.getMonth() === selectedDate.getMonth() && orderDate.getDate() === selectedDate.getDate()

  //   })

  //   // if ordersOnPickedDate is empty skip this part
  //   if (ordersOnPickedDate.length > 0) {
  //     //Get an array of Timing to put on grey color.
  //     nonAvaiTimeArr = ordersOnPickedDate.map(el => {
  //       return el.appointmentTime
  //     })
  //     this.setState({
  //       nonAvaiTime: nonAvaiTimeArr
  //     })

  //   } else {
  //     this.setState({
  //       nonAvaiTime: nonAvaiTimeArr
  //     })

  //   }

  //   console.log("ordersOnPickedDate=", ordersOnPickedDate)
  //   console.log("this.state.pickedDate=", this.state.pickedDate)
  //   console.log("this.state.nonAvaiTime=", this.state.nonAvaiTime)
  // }

  // Triggered after HandleChange setState line 274. 
  // SplitDay calc number of store
  // splitDay = () => {
  //   let dayAvaiArr = [];

  //   // check closed hours
  //   if (!this.state.dayAvailibility.openAm) {
  //     return dayAvaiArr;
  //   }

  //   let openAm = this.state.dayAvailibility.openAm; // coming from state after click on calendar
  //   let closeAm = this.state.dayAvailibility.closeAm;
  //   let openPm = this.state.dayAvailibility.openPm;
  //   let closePm = this.state.dayAvailibility.closePm;


  //   // get opening hours as an array
  //   let strOpenAm = openAm.split(":");
  //   let strCloseAm = closeAm.split(":");

  //   //calc number of slot per opening hours
  //   let morningAvaiSlotNum = timeSlotCalc(strOpenAm, strCloseAm, this.state.timeSlot);



  //   //check if not open on the afternoon
  //   if (openPm) {
  //     let strOpenPm = openPm.split(":");
  //     let strClosePm = closePm.split(":");
  //     let afternoonAvaiSlotNum = timeSlotCalc(strOpenPm, strClosePm, this.state.timeSlot);
  //     dayAvaiArr.push(morningAvaiSlotNum, afternoonAvaiSlotNum);
  //   } else {
  //     dayAvaiArr.push(morningAvaiSlotNum);
  //   }

  //   // console.log("dayAvaiArr=", dayAvaiArr)


  //   return dayAvaiArr;
  // }




  //                                      $$\                     
  //                                     $$ |                    
  //  $$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\  
  // $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$ |$$  __$$\ $$  __$$\ 
  // $$ |  \__|$$$$$$$$ |$$ |  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
  // $$ |      $$   ____|$$ |  $$ |$$ |  $$ |$$   ____|$$ |      
  // $$ |      \$$$$$$$\ $$ |  $$ |\$$$$$$$ |\$$$$$$$\ $$ |      
  // \__|       \_______|\__|  \__| \_______| \_______|\__|      




  render() {

    // Use store picture as background
    let background = this.state.picture;

    const storeIsLoaded = this.state.storeIsLoaded;
    // const dayInfo = this.splitDay();

    // // const nonAvaiTime = this.state.nonAvaiTime;

    // console.log('🚨 this.state.pickedDate=', this.state.pickedDate)

    // if (this.state.orders.length > 0 && this.state.pickedDate) { this.drawAvailability()}
    let ProductFilteredStoreId = []
    let store = this.state.store

    this.state.listOfProducts.forEach(product => { // Boucle sur chaque produit
          if (product.store_id === store._id) { // Si store ID = store ID
            ProductFilteredStoreId.push(store) // push dans ProductFilteredStoreId array
          }
        
      })   
    
    let productList = [...ProductFilteredStoreId]

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
              <a ><Link to={`/storeDetails/appointment/${this.state.store._id}`}>Conseils vidéo</Link></a>
              <a ><Link to={`/storeDetails/appointment/${this.state.store._id}`}>Prendre RDV</Link></a>
              <a href='#'>Voir les produits</a>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{this.state.store.description}</p>
          </div>
          {/* <Calendar
            // activeStartDate
            onChange={this.handleChange}
            pickedDate={this.state.pickedDate}
            showNeighboringMonth={false}
          // tileClassName={tileClassName}
          />
          <h3>{this.state.fullDayName}</h3> */}
          {/* <AppointmentPicker store={this.state.store} pickedDate={this.state.pickedDate} /> */}

          {storeIsLoaded ? (
            <div>
              {/* <AppointmentPicker
                store={this.state.store}
                pickedDate={this.state.pickedDate}
                dayAvailibility={this.state.dayAvailibility}
                dayAvaiArr={dayInfo}
                createOrder={this.createOrder}
                nonAvaiTime={nonAvaiTime}
              /> */}
              <StoreMap store={this.state.store} />
              <ListOfProducts product={productList}/>         
              {/* <div className="product-list-container">
                <li className="product-row">
                  <div className="product-img-and-name">
                    <img className="product-picture" src="https://www.vitafruits.fr/146-medium_default/chou-brocoli.jpg"/>
                    <span className="product-name">Broccolis</span>
                  </div>
                  <div className="product-weight-and-price">
                    <span className="product-weight">300g</span>
                    <div className="product-price">
                      <span className="product-price-value">3.01€</span>
                      <span className="product-price-unity">/kg</span>
                    </div>
                  </div>
                  <div className="book-products" style={{display: "flex"}}>
                    <span>-</span>
                    <span className="product-quantity">0</span>
                    <span>+</span>
                  </div>
                </li>
              </div> */}


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

