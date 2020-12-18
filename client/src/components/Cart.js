import React, { Component } from 'react';
import axios from 'axios';


class Cart extends Component {
  state = {
    query: '',
    isMobile: false, 
    order: []
  }
  
  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }  
  
  componentDidMount() {
    this.getSingleStore()
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  
  resize() {
      this.setState({isMobile: window.innerWidth <= 992});
  }
  
  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }

  //  $$$$$$\            $$\                                              $$\ $$\           
  // $$  __$$\           \__|                                             $$ |$$ |          
  // $$ /  $$ |$$\   $$\ $$\  $$$$$$\   $$$$$$$\        $$$$$$$\ $$$$$$\  $$ |$$ | $$$$$$$\ 
  // $$$$$$$$ |\$$\ $$  |$$ |$$  __$$\ $$  _____|      $$  _____|\____$$\ $$ |$$ |$$  _____|
  // $$  __$$ | \$$$$  / $$ |$$ /  $$ |\$$$$$$\        $$ /      $$$$$$$ |$$ |$$ |\$$$$$$\  
  // $$ |  $$ | $$  $$<  $$ |$$ |  $$ | \____$$\       $$ |     $$  __$$ |$$ |$$ | \____$$\ 
  // $$ |  $$ |$$  /\$$\ $$ |\$$$$$$  |$$$$$$$  |      \$$$$$$$\\$$$$$$$ |$$ |$$ |$$$$$$$  |
  // \__|  \__|\__/  \__|\__| \______/ \_______/        \_______|\_______|\__|\__|\_______/ 

  getSingleStore = () => {
    axios.get(`${process.env.REACT_APP_APIURL || ""}/orders`)
      .then(ordersFromDB => {
        this.setState({
          order: ordersFromDB
        });

      })
      .catch(err => console.log("Error on getting store details:", err))
  }
  
  
  render() {
    const order = this.state.order
    return (
      <div>
        <div className={`${this.state.isMobile ? "page-container-mobile" : "page-container-desktop"}`}>
          {/* <SearchBar query={this.state.query} updateQuery={this.updateQuery} /> */}   
          <div className={`${this.state.isMobile ? "command-section-mobile" : "command-section-desktop"}`}>
            <h2>Mes commandes</h2>
            <hr />
            <div className="command-card">
              <div className="command-title-infos">
                <span className="command-reference">#5678 </span>
                <span>&nbsp;• 02/12/2020 </span>
                <span>&nbsp;à 15h45</span>
              </div>
              <div className="whoTakesOrder">
                <img src="https://www.grange-aux-pains.com/images/boulangerie-lacanau-la-grange-aux-pains.jpg" />
                <h3>La boulangerie de Micheline</h3>
              </div>
              <hr />
              <div className="order-content">
                <li className="order-content-row">
                  <span>Broccolis</span>
                  <span>x3</span>
                  <span>2,80E</span>
                </li>
                <li className="order-content-row">
                  <span>Broccolis</span>
                  <span>x3</span>
                  <span>2,80E</span>
                </li>
                <li className="order-content-row">
                  <span>Broccolis</span>
                  <span>x3</span>
                  <span>2,80E</span>
                </li>
                <li className="order-content-row">
                  <span>Broccolis</span>
                  <span>x3</span>
                  <span>2,80E</span>
                </li>
                <li className="order-content-total-row">
                  <span>Total</span>
                  <span>2,80E</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Cart;