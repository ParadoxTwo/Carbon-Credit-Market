

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Sequester from './components/sequester';
import Mediator from './components/mediator';
import Consumer from './components/consumer';
import NavbarMenu from './components/navbar';
import Footer from './components/footer';



class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <NavbarMenu/>
          <Route exact path="/" component={Home}/>
          <Route path="/sequester" component={Sequester}/>
          <Route path="/mediator" component={Mediator}/>
          <Route path="/consumer" component={Consumer}/>
        </div>
        <Footer/>
      </Router>
    )
  }
}

export default App;
