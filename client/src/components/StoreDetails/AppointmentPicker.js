import React from 'react';

class AppointmentPicker extends React.Component {

  //APPOINTMENTS

  /*
  - Faire coincider le jour choisi avec les horaires d'ouvertures de ce store.
  - Afficher les horaires d'ouverture du jour choisis.
  - Afficher les créneaux disponibles pour un rendez-vous ce jour en question.
  */

  //ATTENTION ADD A STATE FOR THE DAY TO DETERMINE OPENING HOURS



  state = {
    // store: this.props.store
    pickedDate: this.props.pickedDate,
    dayAvail: {}
  }


  render() {


    return (
      <div>

        <h3>Opening hours</h3>
        <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
        <p>and from: {this.props.dayAvailibility.openPm} to {this.props.dayAvailibility.closePm}</p>


      </div>
    )
  }
}

export default AppointmentPicker