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
    dayAvail: this.props.dayAvaiArr,
    morning: true,
    afternoon: true,
    noInterruption: false
  }
  /* _________ANTOINE_______: 
  - en terme de performance est ce mieux d'appeler une fonction ou un state ? 
  - Est ce une bonne pratique de créer un state à partir d'un props ?
  
  ______________________________
  */






  render() {

    if (this.state.dayAvail.length > 1) {

    }


    return (
      <div>

        <h3>Opening hours</h3>
        <p>Open from: {this.props.dayAvailibility.openAm} to {this.props.dayAvailibility.closeAm}</p>
        <p>and from: {this.props.dayAvailibility.openPm} to {this.props.dayAvailibility.closePm}</p>

        <h1>{this.props.dayAvaiArr[0]}</h1>
      </div>
    )
  }
}

export default AppointmentPicker