import React, { Component } from 'react';
import axios from 'axios';
import { useLoading, ThreeDots } from '@agney/react-loading';
import { logout } from './auth/auth-service'


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
    const loggedUser = this.props.loggedInUser

    return (

      <div>
        <div className={`${this.state.isMobile ? "page-container-mobile" : "page-container-desktop"}`}>
          {/* <SearchBar query={this.state.query} updateQuery={this.updateQuery} /> */}   
          <div className={`${this.state.isMobile ? "command-section-mobile" : "command-section-desktop"}`}>
            {this.state.isMobile ? (
              <div className="mobile-command-title">
                <h2>Mes commandes</h2>
                {loggedUser ? (
                  <button className="logout-btn" onClick={(e) => { logout().then(() => this.props.updateUser(null)) }}><svg width="24" height="24"><g fill="none" fillRule="evenodd"><path stroke="#aeb5c5" d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"></path><path fill="#aeb5c5" d="M12.8 11l-2.15-2.15a.5.5 0 11.7-.7L14 10.79a1 1 0 010 1.42l-2.65 2.64a.5.5 0 01-.7-.7L12.79 12H4.5a.5.5 0 010-1h8.3z"></path></g></svg></button>
                ) : (<div />)}
              </div>
            ) : (
              <h2>Mes commandes</h2>
            )}
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
                            <span className="span-name">{product[0].name}</span>
                            <span className="span-qty">{product[0].qty}</span>
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