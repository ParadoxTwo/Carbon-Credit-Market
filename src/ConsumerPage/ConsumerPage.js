import React from 'react';
import { Link } from 'react-router-dom'
import Trade from '../TransactionTable/Trade';
import Wallet from '../TransactionTable/Wallet';
import Table from '../TransactionTable/Table';
import Emission from '../TransactionTable/Emission';
import Header from '../HomePage/Header';
import axios from 'axios';
import Users from '../Backend/abis/Users.json';
import Carbon from '../Backend/abis/Carbon.json';
import Trades from '../Backend/abis/Trades.json';

const Web3 = require('web3');
class ConsumerPage extends React.Component  {
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
	state = {
        web3: {},
		accounts: [],
		exchangeRate: 0,
        transactions: [],
        tenements: [],
        users: null,
        carbon: null,
        trades: null,
		name: '',
		balance: 0,
        tokens: 0,
        popup: false,
        popupDetails: null
	}
	async componentDidMount(){
		await this.loadWeb3();
		await this.loadBlockchainData();
	}
	async loadBlockchainData(){
		const web3 = this.state.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({
            accounts: accounts
		});
		const balance  = await web3.eth.getBalance(accounts[0]);
		this.setState({
			balance
		})
        const networkId = await web3.eth.net.getId();
        let usersNetwork = Users.networks[networkId];
        let carbonNetwork = Carbon.networks[networkId];
        let tradesNetwork = Trades.networks[networkId];
        console.log(this.state.accounts[0]);
        if(usersNetwork&&carbonNetwork&&tradesNetwork){
            console.log(networkId);
            const users = new web3.eth.Contract(Users.abi, usersNetwork.address);
            this.setState({ users });
            const carbon = new web3.eth.Contract(Carbon.abi, carbonNetwork.address);
            this.setState({ carbon });
            const trades = new web3.eth.Contract(Trades.abi, tradesNetwork.address);
            this.setState({ trades });
            await this.state.users.methods.name(this.state.accounts[0]).call((err, name)=>{
                if(err){
				   console.log(err);
				}
                else{
                   console.log(name);
                   if(name==""||name==null){
                        let name = prompt("Please enter your name for registration:");
				        let userid = prompt("Please enter your email id:");
				        this.registration(accounts[0],name,userid);
                   }
				   this.setState({ name });
				}
            });
            try{
                await this.state.carbon.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]}, (err,tokens)=>{
					if(err)
						console.log(err);
					else{
						console.log(tokens);
						this.setState({tokens});
					}
				})
				await this.state.trades.methods.exchangeRate().call({from: this.state.accounts[0]}, (err,exchangeRate)=>{
					if(err)
						console.log(err);
					else{
						console.log(exchangeRate);
						this.setState({exchangeRate});
					}
				})
            }
            catch(err){
                console.log(err);
            }
            await this.getTransactions(accounts[0]);
        }
        else{
            window.alert("Could not detect contract.");
        }
    }
    render(){
        //send these data as props to SequesterPage component
		let exchangeRate = `1 Token = ${this.state.exchangeRate/1000000000000000000} Ethers and 1 Ether = A$351.40`; 
		let emissions = ["Carbon emission","Hydro carbon emission","Miscellaneous emission"];
		let transactionHeaders = ["S.No", "Address", "Tokens", "Cost (Ethers)", "Type", "Status", "Action"];
        return (
			<div>
				<div>
					<Header></Header>
				</div>
				<br></br> <br></br> <br></br>
            	<div className="container mx-auto">
                {/* <Link to="/"><button type="button" class="btn btn-primary btn-sm">Go to Home</button></Link> */}
					<p className="name">Welcome, Edwin</p>
					<div className="mx-auto card text-center text-white bg-dark mb-3" style={{width:"80%"}}>		
						<div className="card-body">
    						<h1 className="card-title">CONSUMER</h1>
							<Wallet carbonTokens={this.state.tokens} ethers={this.state.balance/1000000000000000000} exchangeRate={exchangeRate}/>
  						</div>
					</div>
        			<Emission emissions = {emissions} />
        			<Trade accounts = {this.state.accounts} trades = {this.state.trades} carbon = {this.state.carbon}/>
					<h1 className="mt-5">Transaction History</h1>
					<Table headers={transactionHeaders} rows={this.state.transactions}/>
    			</div>
			</div>
        );
    }
	registration(user, name, userid){
		function refresh(){
			window.location.reload();
		}
		refresh = refresh.bind(this);
        axios({
            method: 'post',
            url: 'http://localhost:5000/register',
            data: {
                address: user,
                name: name,
                userid: userid
            }
        })
        .then(function (response) {
			console.log(response);
			refresh();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    async getTransactions(address){
        let trades = this.state.trades;
        await trades.methods.transactionCount().call({from: address},async (err, txCount)=>{
            if(err){
                console.log(err);
            }
            else{
                let i=0;
                let transactions = [];
                for(;i<txCount;i++){
                    await trades.methods.transactions(i).call({from: address}, async (err, transaction)=>{
                        if(err)
                            console.log(err);
                        else{
                            if(transaction.from==address){
                                transactions.push([i+1,transaction.to,transaction.tokens,transaction.cost/1000000000000000000, "Sale",transaction.status, (<button onClick={async()=>{
                                    if(transaction.status=="finalizing")
                                        this.finalizeTrade(transaction.to);
                                }} type="button" class="btn btn-info">
                                    {transaction.status=="pending"||transaction.status=="success"?null:
                                    transaction.status=="finalizing"?"Finalize":null}</button>)
                                ])
                            }
                            else if(transaction.to==address){
                                transactions.push([i+1,transaction.from,transaction.tokens,transaction.cost/1000000000000000000, "Purchase",transaction.status, (<button onClick={async()=>{
                                    if(transaction.status=="pending")
                                        this.acceptTrade(transaction.from);
                                }} type="button" class="btn btn-info">
                                    {transaction.status=="finalizing"||transaction.status=="success"?null:
                                    transaction.status=="pending"?"Accept":null}</button>)
                                ])
                            }
                        }
                    })
                }
                this.setState({transactions});
                console.log(this.state.transactions);
            }
        })
    }
    async acceptTrade(from){
        let trades = this.state.trades;
        let accounts = this.state.accounts;
        try{
            await trades.methods.exchangeRate().call({from: accounts[0]}, async (err,exchangeRate)=>{
                if(err)
                    console.log(err);
                else{
                    console.log(exchangeRate);
                    await trades.methods.tokenSale(from, accounts[0]).call({from: accounts[0]}, async (err,cost)=>{
                        if(err)
                            console.log(err);
                        else{
                            console.log(cost);
                            cost = cost*exchangeRate;
                            console.log("Cost: "+cost);
                            await trades.methods.acceptTrade(from).send({from: accounts[0], value: cost})
                            .then((receipt)=>{
                                console.log(receipt);
                            })
                        }
                    })
                }
            })
            
        }
        catch (err){
            console.log(err);
        }
    }
    async finalizeTrade(to){
        let trades = this.state.trades;
        let accounts = this.state.accounts;
        let carbon = this.state.carbon;
        try {
            await trades.methods.tokenSale(accounts[0], to).call({from: accounts[0]}, async (err,amount)=>{
                if(err)
                    console.log(err);
                else{
                    console.log(amount);
                    await carbon.methods.transfer(to, amount).send({from: accounts[0]})
                    .then(async (receipt)=>{
                        console.log(receipt);
                        let result = await trades.methods.finalizeTrade(to).send({from: accounts[0]})
                        .then((receipt)=>{
                            console.log(receipt);
                        })
                        console.log(result);
                    })
                }
                    
            })
        }
        catch(err){
            console.log(err);
        }
    }
}



export default ConsumerPage;
