import React, { Component } from 'react';
import { consumerSignup } from './auth-service'
import { Link, Redirect } from 'react-router-dom';

import './SignForm.css';

class Signup extends Component {

  state = {
    email: '',
    password: '',
    type: '',
    redirect: null
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const type = 'consumer'; // Consumer Type is Hardcoded here

    console.log('🍒🍒🍒🍒 JUSQUE LA')

    consumerSignup(email, password, type)
      .then(newConsumer => {
        // this.props.updateUser(response)
        console.log("🌶🌶🌶", newConsumer)
        this.setState({ email: "", password: "", type: "", redirect: '/mapView' });
        this.props.updateUser(newConsumer)

        this.props.history.goBack()

      }).catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} /> // Redirect to '/mapView' set line 25
    // }

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
          <Link className="redirect-link" to={'/login'}>Vous avez déjà un compte ?</Link>

          <button type="submit">S'inscrire</button>

        </form>
      </div>
    )
  }
}

export default Signup;