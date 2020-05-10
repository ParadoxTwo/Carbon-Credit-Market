import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Jumbotron, Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import './sequester.css';
import InputGroup from 'react-bootstrap/InputGroup'
import User from '../abis/User.json';
const Web3 = require('web3');

const ownerPrefix = "resource:org.carbon.token.User#";
var userid = "";
const ip = "http://app.whateverblogger.com:3000/";
export default class Mediator extends Component{
    constructor(props){
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getWalletData = this.getWalletData.bind(this);
        this.getTenementData = this.getTenementData.bind(this);
        this.calculateArea = this.calculateArea.bind(this);
        this.calculateTokens = this.calculateTokens.bind(this);
    }
    async loadWeb3(){
        let web3;
        if(window.ethereum){
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if(window.web3)
            web3 = new Web3(window.web3.currentProvider);
        this.setState({web3});
    }
    
    async loadBlockchainData(){
        const web3 = this.state.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({
            accounts: accounts
        });
        const networkId = await web3.eth.net.getId();
        const network = User.networks[networkId];
        if(network){
            console.log(networkId);
            const user = new web3.eth.Contract(User.abi, network.address);
            this.setState({ user });
            const name = await this.state.user.methods.name().call();
            this.setState({ name });
            console.log(user)
        }
        else{
            window.alert("Could not detect contract.");
        }
    }
    state = {
        web3: {},
        accounts: [],
        user: null,
        name: '',
    }
    allUsers = {

    }
    walletData = {

    }
    allWallets = {

    }
    async componentDidMount(){
        userid = prompt("Enter user id");
        //this.getUserData(userid);
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    render(){
        return (
            <div>
                <Row className="rows spc_row rodd">
                    <span id="username">
                    <Card className="shadow-none p-3 mb-5 bg-light rounded">Welcome {this.state.status?this.state.user.name:"Mediator"}</Card>
                    </span>
                    <Col md={4}  className="btnSec" >
                    
                    <Card  className="bg-light">
                        <Card.Body>
                        <Card.Subtitle style={{ fontSize: '24px', marginBottom: '10px' }}>{this.state.status?this.walletData.tokens:0} tokens</Card.Subtitle>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Your wallet</Card.Title>                            
                            
                        </Card.Body>
                        </Card>
                        
                        </Col>
                        <Col md={4}>
                        <Card  className="bg-light">
                        <Card.Body>
                        <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Current Exchange Rate</Card.Title>
                            <Card.Subtitle style={{ fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>1 Token <span style={{ float: 'right' }}>A$400.00</span></Card.Subtitle>
                            <hr/>
                            <Card.Subtitle style={{ fontSize: '14px', marginTop: '10px' }}>100 Carbon Units <span style={{ float: 'right' }}>1 Token</span> </Card.Subtitle>
                            
                        </Card.Body>
                        </Card>
                        </Col>
                        </Row>
                        <Row  className="rows spc_row rodd">
                        <Col md={12}>
                        <div className="infoToken">
                        <Image style={{ width: '1250px', height: '700px'}}src="../assets/key.jpg" className="seqBg" />
                            <div style={{color: 'white', fontSize: '32px', marginTop: '-290px'}}>
                            <p color="black">Get brief of CO2 user and manage it well.</p>
                            <p color="black">Admin use the key power of managing and regulating chain of carbon token</p>
                            </div>
                        </div>
                        </Col>
                        </Row>
                        <Row className="rows spc_row reven">
                        
                        <Col style={{ marginBottom: '15px', marginTop:'210px'}}  md={8}>
                        <Accordion>
                            <Card>
                                
                                <Accordion.Toggle as={Card.Header}  style={{ color : '#60d660'}}eventKey="0">
                                    Sequester
                                </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <div id="histTable">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>No. of tokens</th>
                                    <th>Detail</th>                                    
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.status?this.allUsers.map((user)=>
                                        user.usertype==="TRADER"?
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{this.calculateTokens(user.id)}</td>
                                            <td><Button>Details</Button></td>
                                        </tr>
                                        :null
                                    ):null
                                    }
                                </tbody>
                                </Table>
                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                
                                <Accordion.Toggle as={Card.Header} style={{ color : '#60d660'}}  eventKey="1">
                                    Consumer
                                </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <div id="histTable">
                                <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>No. of tokens</th>
                                    <th>Detail</th>                                    
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.status?this.allUsers.map((user)=>
                                    user.usertype==="TRADER"?
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{this.calculateTokens(user.id)}</td>
                                        <td><Button>Details</Button></td>
                                    </tr>
                                    :null
                                ):null
                                }
                                </tbody>
                                </Table>
                            </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                        </Col>
                        </Row>
            </div>
        )
    }
    getUserData(userid) { //gets all data about a user and stores into state... state.status determines if it has been set or not.
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
            if(xhr.status === 200 && xhr.readyState === 4){
                var currentUser = JSON.parse(xhr.response);
                this.getWalletData(userid);
                this.getAllUsers();
                this.getTenementData();
                this.setState({ //the moment it is called, the values are rendered into the page
                    status: true,
                    user: currentUser
                },
                ()=>console.log(this.state));
            }
        })
        // open the request with the verb and the url
        xhr.open('GET', ip+`api/User/${userid}`, false);
        xhr.setRequestHeader("Content-Type","application/json");
        // send the request
        xhr.send();
    }
    getTenementData(){ //gets all data about a user's tenements and stores them into that user's tenements... 
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          if(xhr.status === 200 && xhr.readyState === 4){
                var allTenements = JSON.parse(xhr.response);
                
                this.allUsers.forEach((user)=>{
                    var tenements = []
                    allTenements.forEach((tenement)=>{
                        if(tenement.owner===ownerPrefix+user.id){
                            tenements.push(tenement);
                        }
                    })
                    var area = 0;
                    tenements.forEach((tenement)=>{
                        area+=this.calculateArea(tenement.coordinates);
                    })
                    user.tenements = tenements;
                    user.area = area;
                })
                
            }
        })
        // open the request with the verb and the url
        xhr.open('GET', ip+'api/Tenement', false);
        xhr.setRequestHeader("Content-Type","application/json");
        // send the request
        xhr.send();
    }
    getWalletData(userid){ //gets the information of all wallets of a user
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          if(xhr.status === 200 && xhr.readyState === 4){
                var allWallets = JSON.parse(xhr.response);
                this.allWallets = allWallets;
                var wallets = [];
                var tokens = 0;
                allWallets.forEach((wallet)=>{
                    if(wallet.owner === ownerPrefix+userid){
                        wallets.push(wallet);
                    }
                });
                wallets.forEach((wallet)=>{
                    tokens+=wallet.amount;
                })
                this.walletData.userid = userid;
                this.walletData.wallets = wallets;
                this.walletData.tokens = tokens;
                console.log(this.walletData);
            }
        })
        // open the request with the verb and the url
        xhr.open('GET', ip+'api/Wallet', false);
        xhr.setRequestHeader("Content-Type","application/json");
        // send the request
        xhr.send();
    }
    calculateTokens(userid){ //returns the number of tokens in all wallets of a user
        var tokens = 0;
        this.allWallets.forEach((wallet)=>wallet.owner===ownerPrefix+userid?tokens+=wallet.amount:null);
        return tokens
    }
    calculateArea(coordinates){ //calculates area of a polygon based on gps coordinates (I'm not 100% sure that it's correct but based on: https://stackoverflow.com/questions/2861272/polygon-area-calculation-using-latitude-and-longitude-generated-from-cartesian-s , it should be correct)
        var area = 0;
        if(coordinates.length>2){
            for(var i = 0; i< coordinates.length-1;i++){
                area+= (Math.PI/180)*(coordinates[i+1].longitude-coordinates[i].longitude)*(2 + Math.sin((Math.PI/180)*coordinates[i].latitude)+ Math.sin((Math.PI/180)*coordinates[i+1].latitude)) 
            }
            area = area * 6378137 * 6378137 / 2;
        }
        return Math.abs(area);
    }
    getAllUsers() { //gets data about all user (including wallet details) and stores into allUsers... 
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
            if(xhr.status === 200 && xhr.readyState === 4){
                this.allUsers = JSON.parse(xhr.response);
                this.allUsers.forEach((user)=>{
                    user.wallets = [];
                    this.allWallets.forEach((wallet)=>wallet.owner===ownerPrefix+user.id?user.wallets.push(wallet):null)
                })
                console.log(this.allUsers);
            }
        })
        // open the request with the verb and the url
        xhr.open('GET', ip+'api/User', false);
        xhr.setRequestHeader("Content-Type","application/json");
        // send the request
        xhr.send();
    }
}