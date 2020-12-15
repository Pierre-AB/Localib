import React, { Component } from 'react';
import { login } from './auth-service'
import { Link } from 'react-router-dom';

import './SignForm.css';

class Login extends Component {



  state = { email: '', password: '' }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then(response => {
        this.props.updateUser(response)
        this.setState({ email: "", password: "", type: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="sign-page">
        {/* SIGNUP/LOGIN TABS */}
        <div className="sign-tabs">
          <Link to={"/login"} className="sign-tab">Sign in</Link>
          <Link to={"/signup"} className="sign-tab">Sign up</Link>
        </div>

        {/* SIGNUP CONTENT */}
        <form onSubmit={this.handleFormSubmit} className="sign-form">

          {/* <label>Email:</label> */}
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={e => this.handleChange(e)} />

          {/* <label>Password:</label> */}
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />

          {/* <Link to={"/"} className="I-am-retailer">I am a retailer</Link> */}

          <button type="submit">Check-In</button>

        </form>
      </div>
    )
  }
}

export default Login;