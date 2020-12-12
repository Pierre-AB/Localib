import React from 'react';




var morning = true;
var afternoon = true;
var noInterruption = false;
var closed = false;


class AppointmentPicker extends React.Component {

  //APPOINTMENTS

  /*
  - Faire coincider le jour choisi avec les horaires d'ouvertures de ce store.
  - Afficher les horaires d'ouverture du jour choisis.
  - Afficher les créneaux disponibles pour un rendez-vous ce jour en question.
  */

  //ATTENTION ADD A STATE FOR THE DAY TO DETERMINE OPENING HOURS

  state = {
    pickedTime: null,
    timeClicked: false
  }

  /* _________ANTOINE_______: 
  - en terme de performance est ce mieux d'appeler une fonction ou un state ? C'est identique.
  - Est ce une bonne pratique de créer un state à partir d'un props ? Non quand on initialise un state il ne changera pas forcément et on aura pas nécessairement la bonne valeur du state.
  
  ______________________________
  */

  openingType = () => {

    if (this.props.dayAvaiArr.length === 0) {
      morning = false;
      afternoon = false;
      noInterruption = false;
      closed = true;
    } else if (this.props.dayAvaiArr.length === 1) {
      morning = false;
      afternoon = false;
      noInterruption = true;
      closed = false;
    } else if (this.props.dayAvaiArr.length > 1) {
      morning = true;
      afternoon = true;
      closed = false;
    }
  }


  appointmentPick = (time) => {
    this.setState({
      pickedTime: time,
      timeClicked: true
    })
  }

  // Send hour selected to the parents StoreDetails
  bookAppointment = () => {
    this.props.createOrder(this.state.pickedTime)
  }

  // Add className to hour picker button in order to know if the user can select or not this timeslot.
  defDayAvaiArr = (index) => {

    let condiAvai = [];

    const nonAvaiTime = this.props.nonAvaiTime;
    condiAvai = this.props.dayAvaiArr[index].map((time, index) => {

      if (nonAvaiTime.includes(time)) {
        return <div key={index} >
          <button className='Non-AvailableTime' onClick={(event) => {
            event.stopPropagation()
            this.appointmentPick(time)
          }}> {time}</button>
        </div>
      } else {
        return <div key={index} >
          <button className='AvailableTime' onClick={(event) => {
            event.stopPropagation()
            this.appointmentPick(time)
          }}> {time}</button>
        </div>
      }
    })

    // console.log('je passe par là et je rend condiAvai=', condiAvai)
    return condiAvai || null
  }





  //                                      $$\                     
  //                                     $$ |                    
  //  $$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\  
  // $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$ |$$  __$$\ $$  __$$\ 
  // $$ |  \__|$$$$$$$$ |$$ |  $$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
  // $$ |      $$   ____|$$ |  $$ |$$ |  $$ |$$   ____|$$ |      
  // $$ |      \$$$$$$$\ $$ |  $$ |\$$$$$$$ |\$$$$$$$\ $$ |      
  // \__|       \_______|\__|  \__| \_______| \_______|\__|      




  render() {

    this.openingType()
    const timeClicked = this.state.timeClicked


    return (
      <div>
        <div onClick={() => {
          this.setState({
            timeClicked: false
          })
        }}>
          <h3>Opening hours</h3>

          {morning && afternoon ?
            (<div>
              <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
              <p>& from: {this.props.dayAvailibility.openPm} to {this.props.dayAvailibility.closePm}</p>

              <h2>Morning:</h2>
              {this.defDayAvaiArr(0)}

              <h2>Afternoon:</h2>
              {this.defDayAvaiArr(1)}
            </div>)
            : noInterruption ?
              (
                <div>
                  <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
                  {this.defDayAvaiArr(0)}
                </div>
              )

              :
              (<div>
                <h2>closed</h2>
                {`${this.props.store.fullName} will be glad to have you another day `}
              </div>)

          }
        </div>

        {timeClicked ?
          (<div>
            <form onSubmit={this.bookAppointment}>
              <input type="submit" value="Book this appointment" />
            </form>

          </div>)
          :
          <div>

          </div>}

      </div>
    )
  }
}

export default AppointmentPicker


  // < p > and from: { this.props.dayAvailibility.openPm } to { this.props.dayAvailibility.closePm }</p >