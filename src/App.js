

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

// class App extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       accounts: ['']
//     };
//   }
  
//   async loadWeb3(){
//     if(window.web3)
//     window.web3 = new Web3(
//       new Web3.providers.HttpProvider('HTTP://127.0.0.1:7543')
//     );

//     // if(window.web3){
//     //   window.web3 = new Web3(Web3.givenProvider);
//     // }
//     // if (window.ethereum) {
//     //   window.web3 = new Web3(ethereum);
//     //   try {
//     //       // Request account access if needed
//     //       await ethereum.enable();
//     //   } catch (error) {
//     //       // User denied account access...
//     //   }
//     // }
//     // // Legacy dapp browsers...
//     // else if (window.web3) {
//     //     window.web3 = new Web3(web3.currentProvider);
//     // }
//     // // Non-dapp browsers...
//     // else {
//     //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     // }
//   }
//   async componentDidMount(){
//     await this.loadWeb3();
//     await this.loadBlockchainData();
//     await this.loadContract();
//   }
  
//   async loadContract(){
//     const web3 = window.web3;
//     const networkId = await web3.eth.net.getId();
//     const network = User.networks[networkId];
//     if(network){
//       console.log(networkId);
//     }
//     else{
//       window.alert("Could not detect contract.");
//     }
//   }
//   async loadBlockchainData(){
//     const web3 = window.web3;
//     const accounts = await web3.eth.getAccounts();
//     this.setState({
//       accounts: accounts
//     });
//   }
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//           <a
//             className="navbar-brand col-sm-3 col-md-2 mr-0"
//             href="https://bitbucket-students.deakin.edu.au/scm/capstone/carbon-credit-market---master.git"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Carbon Credit Market
//           </a>
//           <ul className="navbar-nav px-3">
//             {this.state.accounts.map((account,i)=>(<li className = "nav-item text-nowrap d-none d-sm-none d-sm-block" key={i}>
//               <small className = "text-secondary">
//                 {i<3?<small id={"account"+i} key={i}>{account}</small>:null}
//               </small>
//             </li>))}
//           </ul>
//         </nav>
//         <div className="container-fluid mt-5">
//           <div className="row">
//             <main role="main" className="col-lg-12 d-flex text-center">
              
//             </main>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
