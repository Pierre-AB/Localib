import React from 'react';
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
import Cart from './components/Cart';
import UserSettings from './pages/UserSettings';

// import pages for Login, Sign up & Log out
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

import FilteredMap from './components/Maps/FilteredMap'

// import service
import { loggedIn } from './components/auth/auth-service'


// import pages for store views
import StoreDetails from './components/StoreDetails/StoreDetails'
import StorePickADate from './components/StoreDetails/StorePickADate'

// import page for product creation

// import AddProduct from './components/Products/addProducts'

// import success page
import Success from './pages/Success'

// filtered map 
import MapContainerSearchFilter from './components/Maps/FilteredMap'


class App extends React.Component {
  state = {
    query: '',
    loggedInUser: null
  }

  updateQuery = (newValue) => {
    this.setState({ query: newValue });
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      loggedIn()
        .then(response => {
          this.setState({ loggedInUser: response })
        })
        .catch(err => {
          this.setState({ loggedInUser: false })
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  // COMMENT FAIRE POUR LA LIGNE 89 ????


  render() {


    return (
      <div className="App">
        <Navigation
          query={this.state.query}
          updateQuery={this.updateQuery}
          loggedInUser={this.state.loggedInUser}
          updateUser={this.updateLoggedInUser}
        />
        <Switch>
          {/* Splash Screen */}
          <Route exact path="/" component={Splash} />

          {/* Navbar */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/listSearch" component={SearchListResults} />
          <Route exact path="/mapView" component={MapView} />
          <Route exact path="/cart" render={(props) => <Cart loggedInUser={this.state.loggedInUser} {...props} />} />
          <Route exact path="/userSettings" component={UserSettings} />

          {/* Store Details */}
          <Route exact path="/storeDetails/:id" render={(props) => <StoreDetails loggedInUser={this.state.loggedInUser} {...props} />} />
          <Route exact path="/storeDetails/appointment/:id" render={(props) => <StorePickADate loggedInUser={this.state.loggedInUser} {...props} />}/>


          {/* Signup, Login*/}
          <Route exact path="/signup" render={(props) => <Signup updateUser={this.updateLoggedInUser} {...props} />} />
          <Route exact path="/login" render={(props) => <Login updateUser={this.updateLoggedInUser} {...props} />} />

          {/* product create form */}
          {/* <Route exact path="/products" component={AddProduct} /> */}

          {/* success page */}
          <Route exact path="/success" component={Success} />

          {/* <Route exact path="/mapviewv" component={MapContainerSearchFilter}/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
