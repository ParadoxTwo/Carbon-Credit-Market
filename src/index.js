import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ConsumerPage from './ConsumerPage/ConsumerPage';
import SequesterPage from './SequesterPage/SequesterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
ReactDOM.render(
  
  <Router>
    <Route path="/consumer" component={ConsumerPage}/>
    <Route path="/sequester" component={SequesterPage}/>
    <Route exact path="/" component={App}/>
  </Router>,
   
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
