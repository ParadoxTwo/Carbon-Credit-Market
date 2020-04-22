import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Jumbotron, Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import './sequester.css';
import InputGroup from 'react-bootstrap/InputGroup';
import User from '../abis/User.json';
const Web3 = require('web3');

//some useful constants
const tokenToAUD = 400; //random value
const tokenToCarbon = 100; //assuming as tons (1 ton of carbon being 1 unit of carbon)
const ownerPrefix = "resource:org.carbon.token.User#";

const averageTreesPerAcre = 60; //googled "average trees per acre in a forest", result is for healthy forests
const acre = 4046; //metre square
const ton = 2000; //pounds

const treeSequestrationAnnual = 88; //pounds per tree (used data provided here: https://archpaper.com/2017/07/trees-sequester-carbon-myth/)

var userid = "";
const ip = "http://app.whateverblogger.com:3000/";

export default class Sequester extends Component{
    constructor(props){
        super(props)
        // this.getUserData = this.getUserData.bind(this);
        // this.getTenementData = this.getTenementData.bind(this);
        // this.getWalletData = this.getWalletData.bind(this);
        // this.calculateArea = this.calculateArea.bind(this);
        // this.getAllUsers = this.getAllUsers.bind(this);
        // this.transferMoney = this.transferMoney.bind(this);
        // this.calculateToken = this.calculateToken.bind(this);
    }
    async componentDidMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.loadContract();
    }
    async loadWeb3(){
        if(window.web3)
        window.web3 = new Web3(
            new Web3.providers.HttpProvider('HTTP://127.0.0.1:7543')
        );
    }
        
    async loadContract(){
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const network = User.networks[networkId];
        if(network){
            console.log(networkId);
        }
        else{
            window.alert("Could not detect contract.");
        }
    }
    async loadBlockchainData(){
        const web3 = window.web3;
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
        accounts: [],
        user: null,
        name: '',
    }
    
    render(){
        const {posts} = this.state
        return (
            <div>
                <Row className="rows spc_row rodd">
                    <span id="username">
                    <Card className="shadow-none p-3 mb-5 bg-light rounded">Welcome {this.state.name} </Card>
                    </span>
                    <Col md={6}  className="btnSec" >
                    
                    <Card  className="bg-light">
                        <Card.Body>
                            <Card.Subtitle style={{ fontSize: '24px', marginBottom: '10px' }}>{this.state.status?this.walletData.tokens:0} Token</Card.Subtitle>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Your wallet</Card.Title>
                        </Card.Body>
                        </Card>
                        
                        </Col>
                        <Col md={6}>
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
                        <Image style={{ width: '1250px', height: '600px'}}src="../assets/forest.jpg" className="seqBg" />
                            <div style={{color: 'white', fontSize: '32px', marginTop: '-350px'}}>
                            <p>Now it's easy to see the number of token you can earn.</p>
                            <p>Simply enter the sequestration amount below and Try it</p>
                            </div>
                        </div>
                        </Col>
                    <Col  style={{ marginBottom: '15px', marginTop:'236px'}} md={{ span: 8, offset: 2 }}>
                        
                        <Card  className="bg-light">
                        <Card.Body>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Earn Token</Card.Title>
                            <Card.Title>
                                Enter yearly sequestration <input type="text" id="sequestrationAmount"/> Tonnes/year<br></br>
                                <span id="seqAmt"></span><br></br><br></br>
                                <Button variant="success" onClick={this.calculateToken}>Calculate</Button>
                            </Card.Title>
                            
                        </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>CO2 you can sequestrate yearly:</Card.Title>
                            <Card.Title>
                                {this.state.status?this.getCarbonSequestrationValue(this.tenementData.area):0} tons/year
                            </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                <Row className="rows spc_row reven align-items-center">                    
                <Col md={6}>
                    <div>  
                    
                        <h4>Trade</h4>
                        <Card className="shadow-none p-3 mb-5 bg-light rounded">
                        <div className="trade">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Sender</td>
                                        <td>
                                            <select id="sender">
                                                {
                                                    this.state.status?
                                                    this.walletData.wallets.map((wallet)=><option key={wallet.id} value={wallet.id} readOnly>{wallet.id}</option>):
                                                    <option>select your wallet</option>
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Receiver</td>
                                        <td>
                                        <select id="receiver">
                                            {
                                                this.state.status?
                                                this.allUsers.map((user)=>user.wallets.map((wallet)=><option readOnly key={user.id+wallet.id} value={wallet.id}>{user.id}: {user.name}, {wallet.id}</option>)):
                                                <option>select receiver</option>
                                            }
                                        </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amount to send</td>
                                        <td><input id="sendToken" type="number"></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br></br>
                            {this.state.status?<Button variant="info" type = "submit"onClick={()=>this.transferMoney(document.getElementById("sender").value, document.getElementById("receiver").value, document.getElementById("sendToken").value)}>Send</Button>:null}
                        </div>
                        </Card>
                    </div>
                    </Col>
                    <Col md={6}>
                    <Card style={{background: '#60d660', padding:'35px'}}>
                        <Card.Subtitle style={{fontSize: '19px', fontFamily: 'Segoe UI Symbol', padding:'10px', textAlign:'center'}}>It's better to trade with secure way. <br/> RIGHT! It's blockchain, maintain complete ownership of your assets. <br/><br/> For doing the sequestering job you can earn lot. Just TRADE it with polluting group</Card.Subtitle>
                        <Image style={{ width: '78px', height: '112px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}src="../assets/money.png"/>
                    </Card>
                    </Col>
                    </Row>
                    <Row className= "rows spc_row rodd align-items-center">
                    <Col md={6}>
                        <Card style={{background: '#60d660', padding:'35px'}}>
                        <Card.Subtitle style={{fontSize: '22px', fontFamily: 'Segoe UI Symbol', padding:'10px'}}>Easy to track your record. See brief of your transaction within your comfort.</Card.Subtitle>
                        <Image style={{ width: '112px', height: '112px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}src="../assets/transc.png"/>
                        </Card>
                        </Col>
                    <Col md={6}>
                        <div>
                            <h4>History</h4>
                            <div id="histTable">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>No. of tokens</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.status?this.walletData.wallets.map((wallet,i)=>
                                wallet.transactions.map((transaction,j)=>
                                <tr key={i*wallet.transactions.length+j}>
                                        <td>{i*wallet.transactions.length+j}</td>
                                        <td>{this.state.user.name}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.type}</td>
                                    </tr>
                                )
                            ):null
                            }
                                </tbody>
                                </Table>
                            </div>
                        </div>
                        </Col>
                        
                    </Row>
            </div>
        )
    }
    calculateToken(){
        var input = document.getElementById("sequestrationAmount").value;
        var output = document.getElementById("seqAmt");
        output.innerHTML = `You can earn ${input/100} tokens`;
    }
    getCarbonSequestrationValue(area){ //uses area of tenements and constants (declared at the top) to calculate the value of carbon sequestered by a user's tenements annually
        area = area/acre;
        var trees = averageTreesPerAcre*area;
        var carbonPoundsAnnual = trees*treeSequestrationAnnual;
        var carbonTonsAnnual = carbonPoundsAnnual/ton;
        return carbonTonsAnnual;
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
    transferMoney(fromWallet, toWallet, amount){ //transfers tokens and re-renders new values into the screen

    }
    getAllUsers() { //gets data about all user (including wallet details) and stores into allUsers... 

    }
    getUserData(userid) { //gets all data about a user and stores into state... state.status determines if it has been set or not.
        
    }
    getTenementData(userid){ //gets all data about a user's tenements and stores them into tenementData... tenementData.status determines if it has been set or not.

    }
    getWalletData(userid){ //gets the information of all wallets of a user
        
    }
    
}