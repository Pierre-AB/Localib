import React from 'react';
import logo from './logo.svg';
import './App.css';
import './CommonStyle.css';
import { Switch, Route } from 'react-router-dom';


//import Splash Screen
import Splash from './pages/Splash';

// import pages for Navbar
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SearchListResults from './pages/SearchListResults';
import MapView from './pages/MapView';
import Cart from './pages/Cart';
import UserSettings from './pages/UserSettings';

// import pages for Login, Sign up & Log out
import Signup from './components/auth/Signup'

// import page for product creation
// import AddProduct from './components/Products/addProducts'


function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        {/* Splash Screen */}
        <Route exact path="/" component={Splash} />

        {/* Navbar */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/listSearch" component={SearchListResults} />
        <Route exact path="/mapView" component={MapView} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/userSettings" component={UserSettings} />
        
        {/* Login & signup */}
        <Route exact path="/signup" component={Signup} />

        {/* product create form */}
        {/* <Route exact path="/products" component={AddProduct} /> */}
      </Switch>
    </div>
  );
}

export default App;
