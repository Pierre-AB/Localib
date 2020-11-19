import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// import pages for Navbar
import Home from './pages/Home';
import SearchListResults from './pages/SearchListResults';
import MapView from './pages/MapView';
import Basket from './pages/Basket';
import UserSettings from './pages/UserSettings';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route  exact path="/home" component={Home} />
        <Route  exact path="/listSearch" component={SearchListResults} />
        <Route  exact path="/mapView" component={MapView} />
        <Route  exact path="/basket" component={Basket} />
        <Route  exact path="/userSettings" component={UserSettings} />
      </Switch>
    </div>
  );
}

export default App;
