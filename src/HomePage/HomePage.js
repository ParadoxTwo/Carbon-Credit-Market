import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
function HomePage() {
  return (
    <div>
        <div>
				<Header></Header>
				</div>
				 <br></br> <br></br>
        {/* <!-- Header --> */}
  <header class="jumbotron bg-dark  py-5 mb-5">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-lg-12">
          <h1 class="display-4 text-white mt-5 mb-2">
            We can help you create a tradeable liquidity
            for your carbon dense asset !</h1>
        
        </div>
      </div>
    </div>
  </header>


  {/* <!-- Page Content --> */}
  <div class="container">

    <div class="row">
      <div >
        <h2>WHAT WE PROVIDE</h2>
        <hr/>
        <p class="display-4">Hello, Need to find out your carbon asset ? </p>
        <p> Now you can pay price for what you destroy and overcome damage just by just registering your land you can get token which can provide you liquidity.
</p>
        
      </div>
     
    </div>
    {/* <!-- /.row --> */}



<div class="card text-center my-5">
  <div class="card-header">
  FEATURES WE HAVE
  </div>
  <div class="card-body">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">1.
Carbon Trade-
The way to keep enviornment balanced.</li>
    <li class="list-group-item">2.
Blockchain Technology -
Secure, transperent and full ownership of your property.</li>
    <li class="list-group-item">3.
Mediator -
All paperwork of tokenization is now in your hand and also verification.</li>
<li class="list-group-item">4.
Sequestering activities -
helps you participate in venture of saving environment along with monetary benefits</li>
  </ul>
</div>
  </div>
 




   
    <div>
    <h2>
WHICH ROLE YO WANT TO PLAY ?</h2>
        <hr/>
    
    <div class="row my-5">
      <div class="col-md-6 mb-6">
        <div class="card h-100">
          <img class="card-img-top" src="https://cff2.earth.com/uploads/2018/10/29202607/What-is-it-about-baobab-trees-that-makes-them-so-captivating-730x410.jpg" alt=""/>
          <div class="card-body">
            <h4 class="card-title">Sequester</h4>
            <p class="card-text">Want to be a sequester</p>
          </div>
          <div class="card-footer">
          <Link to="/sequester"><button type="button" class="btn btn-primary btn-lg">Sequester Page</button></Link>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-6">
        <div class="card h-100">
          <img class="card-img-top" src="https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
          <div class="card-body">
            <h4 class="card-title">Consumer</h4>
            <p class="card-text">Want to be a consumer</p>
          </div>
          <div class="card-footer">
          <Link to="/consumer"><button type="button" class="btn btn-primary btn-lg">Consumer Page</button></Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    {/* <!-- /.row --> */}

  </div>
  {/* <!-- /.container --> */}
  
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">
      The webpage is basically to interpret how the carbon credit system works and implementation of the token to make secure transfer between user group. 
          Copyright &copy; Your Website 2020</p>
    </div>
    {/* <!-- /.container --> */}
  </footer>
    </div>
  );
}

export default HomePage;