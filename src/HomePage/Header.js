import React from 'react';
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">CARBON TENEMENTS</a>
      {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive"> */}
      <div id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/">  <a class="nav-link" href="#">Home</a></Link>
          </li>
          <li class="nav-item active">
            <Link to="/consumer">  <a class="nav-link" href="#">Consumer</a></Link>
          </li>
          <li class="nav-item active">
            <Link to="/sequester">  <a class="nav-link" href="#">Sequester</a></Link>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li> */}
        </ul>
      </div>
    </div>
  </nav>
    </div>
  );
}
export default Header;
