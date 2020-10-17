import React from 'react';
import './App.css';
// import { Link } from 'react-router-dom'
import HomePage from './HomePage/HomePage';
function App() {
  return (
    <div className="App ">
      <HomePage></HomePage>
      {/* <Link to="/consumer"><button type="button" class="btn btn-primary btn-lg">Consumer Page</button></Link>
        <Link to="/sequester"><button type="button" class="btn btn-secondary btn-lg">Sequester Page</button></Link> */}
    </div>
  );
}
export default App;
