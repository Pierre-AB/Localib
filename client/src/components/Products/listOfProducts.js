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

  changeQty = (e) => {
    let productQtyDiv = e.target.querySelector(".book-products"); //e.target => product-img-and-name
    console.log("e", e)
    if (e.target.classList.contains('product-row')) {
      if (productQtyDiv.style.display === "none") {
        productQtyDiv.style.display = "flex";
      } else {
        productQtyDiv.style.display = "none";
      }
    }
  }


  render (){

  let product = this.props.products
  return (
    <div>

    {this.props.length <= 0 && <ThreeDots width="30" />}

      <div className="product-list-container">
        <li onClick={this.changeQty} className="product-row">
          <div className="product-img-and-name">
            <img className="product-picture" src={this.props.picture}/>
            <span className="product-name">{this.props.name}</span>
          </div>
            <div className="product-price">
              <span className="product-price-value">{this.props.price}€</span>
            </div>
          <div className="book-products" style={{display: "none"}}>
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
