import React from 'react';

class DateTime extends React.Component {
  state = {
    pickedTime: this.props.value
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



      </div>
    )
  }

}

export default DateTime