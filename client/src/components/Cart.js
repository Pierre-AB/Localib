import React, { Component } from 'react';
import axios from 'axios';
import { useLoading, ThreeDots } from '@agney/react-loading';



class Cart extends Component {
  state = {
    query: '',
    isMobile: false, 
    orders: [],
    stores: []
  }
  
  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }  
  
  componentDidMount() {
    this.getOrders();
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

  getOrders = () => {
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/orders`)
      .then(ordersFromDB => {
        this.setState({
          orders: ordersFromDB.data
        });

      })
      .catch(err => console.log("Error on getting Orders", err))
  }

  // getStores = () => {
  //   axios.get(`${process.env.REACT_APP_APIURL || ""}/api/stores`)
  //     .then(storesFromDB => {
  //       this.setState({
  //         stores: storesFromDB.data
  //       });

  //     })
  //     .catch(err => console.log("Error on getting Orders", err))
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

    let allOrders = this.state.orders

    return (



      <div>
        <div className={`${this.state.isMobile ? "page-container-mobile" : "page-container-desktop"}`}>
          {/* <SearchBar query={this.state.query} updateQuery={this.updateQuery} /> */}   
          <div className={`${this.state.isMobile ? "command-section-mobile" : "command-section-desktop"}`}>
            <h2>Mes commandes</h2>
            <hr />

             {allOrders.length <= 0 && <ThreeDots width="30" />}

              {allOrders.map(order => {
                return (
                  
                    <div className="command-card">
                      <div className="command-title-infos">
                        <span className="command-reference"> {order._id} </span>
                        <span>&nbsp;• {order.appointmentDay} </span>
                        <span>&nbsp;à {order.appointmentTime}</span>
                      </div>
                      <div className="whoTakesOrder">
                        <img src="https://www.grange-aux-pains.com/images/boulangerie-lacanau-la-grange-aux-pains.jpg" />
                        <h3>La boulangerie de Micheline</h3>
                      </div>
                      <hr />

                      {order.products && order.products.map(product => {
                        return (
                          <div className="order-content">
                            <li className="order-content-row">
                            <span>{product[0].name}</span>
                            <span>{product[0].qty}</span>
                            <span>{product[0].price}€</span>
                            </li>
                          </div>
                        )
                      })}
                      {/* <div className="order-content">
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
                      </div> */}
                    </div> 

                  )
                })

              }

              
            {/* <div className="command-card">
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
            </div>  */}
           
          </div>
        </div>
      </div>
    );
  }
}



export default Cart;