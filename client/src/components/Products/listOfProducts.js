import React from 'react'
import { ThreeDots } from '@agney/react-loading';



class listOfProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      selected: false
    };
  }



  addQty = (ev) => {

    this.setState({
      qty: this.state.qty + 1, //qty = 2 - this.state.qty = 2 + 1 
    }, () => {
      this.props.addToCart({ name: this.props.name, qty: 1 })
      console.log("this.state.qty", this.state.qty)
    })

  }

  removeQty = (ev) => {
    if (this.state.qty > 0) {
      this.setState({
        qty: this.state.qty - 1
      })
      this.props.addToCart({ name: this.props.name, qty: -1 })
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


  render() {
    const selected = this.state.selected
    let product = this.props.products
    const qty = this.state.qty
    return (
      <div>

        {this.props.length <= 0 && <ThreeDots width="30" />}

        <div className="product-list-container">
          <li onClick={this.changeQty} className="product-row">
            <div className="product-img-and-name">
              <img className="product-picture" src={this.props.picture} />
              <span className="product-name">{this.props.name}</span>
            </div>
            <div className="product-price">
              <span className="product-price-value">{this.props.price}€</span>
            </div>
            <div className="book-products" style={{ display: "none" }}>
              <span onClick={this.removeQty}>-</span>
              {/* <input type="number" className='' value={this.state.qty} onChange={this.addQty}/> */}
              <span className="product-quantity">{qty}</span>
              <span onClick={this.addQty}>+</span>
            </div>
          </li>
        </div>

      </div>
    )
  }
}

export default listOfProducts
