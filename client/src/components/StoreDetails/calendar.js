import React from 'react';
import Datetime from 'react-datetime';
import './calendar.css';

/* Composant qui affichera le calendrier des disponibilités de la boutique sélectionnée 

1 - Définir la plage d'ouverture de la boutique.
2 - Définir les dispos en fonction du pas défini.
3 - Afficher les plages dispos.

Requisite dans le modèle:
  * Horaire d'ouverture
  * Slot de temps par créneaux

Quand le user clique sur

*/



class Calendar extends React.Component {

  state = {
    pickedTime: ''
  }

  handleChange = (event) => {
    this.setState({
      pickedTime: event.target.value
    }
    )
  }

  render() {

    return (
      <div>
        Test
        <Datetime value={this.state.pickedTime} onChange={e => this.handleChange(e)} />



      </div>
    )
  }

}

export default Calendar;