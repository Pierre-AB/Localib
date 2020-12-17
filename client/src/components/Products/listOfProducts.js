import React from 'react'
import { ThreeDots } from '@agney/react-loading';



class listOfProducts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      qty: 0
    };
    
  }

  addQty = (ev) => {
    this.setState({qty: this.state.qty+1})
  }

  removeQty = (ev) => {
    if (this.state.qty > 0) {
      this.setState({qty: this.state.qty-1})
    } 
  }


  render (){

  let product = this.props.products
  return (
    <div>

    {this.props.length <= 0 && <ThreeDots width="30" />}


   
      
      <div className="product-list-container">
        <li className="product-row">
          <div className="product-img-and-name">
            <img className="product-picture" src={this.props.picture}/>
            <span className="product-name">{this.props.name}</span>
          </div>
            <div className="product-price">
              <span className="product-price-value">{this.props.price}€</span>
            </div>
          <div className="book-products" style={{display: "flex"}}>
            <span onClick={this.removeQty}>-</span>
            <span className="product-quantity">{this.state.qty}</span>
            <span onClick={this.addQty}>+</span>
          </div>
        </li>
      </div>

    </div>
  )
  }
}

export default listOfProducts
