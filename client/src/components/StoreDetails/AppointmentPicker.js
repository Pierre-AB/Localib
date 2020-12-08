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
  - en terme de performance est ce mieux d'appeler une fonction ou un state ? 
  - Est ce une bonne pratique de créer un state à partir d'un props ?
  
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

  bookAppointment = () => {
    this.props.createOrder(this.state.pickedTime)
  }

  render() {

    this.openingType()
    const timeClicked = this.state.timeClicked

    function unclickedButton(event, time) {
      event.stopPropagation() // unclick / release when we click on a button.
      this.appointmentPick(time)
    }

    return (
      <div onClick={() => {
        this.setState({
          timeClicked: false
        })
      }}>

        <h3>Opening hours</h3>

        { morning && afternoon ?
          (<div>
            <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
            <p>& from: {this.props.dayAvailibility.openPm} to {this.props.dayAvailibility.closePm}</p>

            <h2>Morning:</h2>
            {this.props.dayAvaiArr[0].map((time, index) => {
              return <div key={index}>
                <button onClick={(event) => { unclickedButton(event, time) }}> {time}</button>
              </div>
            })}

            <h2>Afternoon:</h2>
            {this.props.dayAvaiArr[1].map((time, index) => {
              return <div key={index} >
                <button onClick={(event) => { unclickedButton(event, time) }}>{time}</button>
              </div>
            })}
          </div>)
          : noInterruption ?
            (
              <div>
                <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
                {this.props.dayAvaiArr[0].map((time, index) => {
                  return <div key={index}>
                    <button onClick={(event) => { unclickedButton(event, time) }}>{time}</button>
                  </div>
                })}
              </div>
            )

            :
            (<div>
              <h2>closed</h2>
              {`${this.props.store.fullName} will be glad to have you another day `}
            </div>)

        }
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