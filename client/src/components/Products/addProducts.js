// components/projects/AddProject.js

import React, { Component } from 'react';
import {createProduct} from './product-service'


class AddProduct extends Component {
  constructor(props){
      super(props);
      this.state = { 
        name: "",
        description: "",
        picture: "",
        price: "",
        category: "",
        Tags: ""
  }
}
   
handleFormSubmit = (event) => {
  event.preventDefault();
  const { name, description, picture, price, category,Tags } = this.state

  createProduct(name, description, picture, price, category,Tags)
    .then(response => {
      this.setState({
        name: "",
        description: "",
        picture: "",
        price: "",
        category: "",
        Tags: ""
      });
    })
    .catch( error => console.log(error) )
}

handleChange = (event) => {  
  const {name, value} = event.target;
  this.setState({[name]: value});
}

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>

        <h1>Create a product</h1>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
          <label>Picture URL:</label>
          <input type="text" name="picture" value={this.state.picture} onChange={ e => this.handleChange(e)}/>
          <label>Price:</label>
          <input type="number" name="price" value={this.state.price} onChange={ e => this.handleChange(e)}/>
          <label>Category:</label>
          <input type="text" name="category" value={this.state.category} onChange={ e => this.handleChange(e)}/>
          <label>Tags:</label>
          <textarea name="Tags" value={this.state.Tags} onChange={ e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProduct;