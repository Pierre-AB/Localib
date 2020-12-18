import React, { Component } from 'react';
import { login } from './auth-service'
import { Link, Redirect } from 'react-router-dom';

import './SignForm.css';

class Login extends Component {



  state = {
    email: '',
    password: '',
    redirect: null
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then(response => {
        this.props.updateUser(response)
        this.setState({ email: "", password: "", type: "", redirect: '/mapView' });
        this.props.history.goBack() // redirection to previous page.
      })
      .catch(error => console.log(error))
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

          <Link to={'/signup'}>Vous n'avez pas encore de compte ?</Link>

          <button type="submit">Se connecter</button>

        </form>
      </div>
    )
  }
}

export default Login;