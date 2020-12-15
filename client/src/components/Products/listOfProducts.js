import React from 'react'

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

  const productList = this.props.product

  return (
    <div>
    {productList.map(product => {
      <div className="product-list-container">
        <li className="product-row">
          <div className="product-img-and-name">
            <img className="product-picture" src={product.picture}/>
            <span className="product-name">{product.name}</span>
          </div>
            <div className="product-price">
              <span className="product-price-value">{product.price}€</span>
            </div>
          <div className="book-products" style={{display: "flex"}}>
            <span onClick={this.removeQty}>-</span>
            <span className="product-quantity">{product.qty}</span>
            <span onClick={this.addQty}>+</span>
          </div>
        </li>
      </div>
    })}
    </div>

  )
  }
}

export default listOfProducts
