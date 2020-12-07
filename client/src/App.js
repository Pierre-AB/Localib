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

// import pages for store views
import StoreDetails from './components/StoreDetails/StoreDetails'

// import page for product creation

// import AddProduct from './components/Products/addProducts'

// import success page
import Success from './pages/Success'


class App extends React.Component {
  state = {
    query: ''
  }

  updateQuery = (newValue) => {
    this.setState({query: newValue});
  }

  render() {
    return (
      <div className="App">
        <Navigation query={this.state.query} updateQuery={this.updateQuery} />
        <Switch>
          {/* Splash Screen */}
          <Route exact path="/" component={Splash} />
  
          {/* Navbar */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/listSearch" component={SearchListResults} />
          <Route exact path="/mapView" component={MapView} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/userSettings" component={UserSettings} />
  
          {/* Store Details */}
          <Route exact path="/storeDetails/:id" component={StoreDetails} />
  
          {/* Login & signup */}
          <Route exact path="/signup" component={Signup} />
  
          {/* product create form */}
          {/* <Route exact path="/products" component={AddProduct} /> */}
  
          {/* success page */}
          <Route exact path="/success" component={Success} />
        </Switch>
      </div>
    );
  }
}

export default App;
