import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppNavbar from './components/Navbar';
import Handpose from './components/Handpose/Handpose';
import Home from './components/Home';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App bg-dark">
      <Router>
        <AppNavbar />
        <Switch>
          <Route path="/handpose">
            <Handpose />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
