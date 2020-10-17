/*
  Designed and Developed by Aswin & Nimisha
  Backend functionalities added by Edwin
*/
import React from 'react';//
class Trade extends React.Component  {
	render() {
		return (
		<div className="mx-auto  text-dark">          
    		<h1 className="card-title text-center font-weight-bold">Trade</h1>
        <hr></hr>
			  <h4 className="text-center">Sell Tokens</h4>
		    <form className="mx-auto" style={{width:"70%"}}>
          <div class="form-group align-center">
            <label for="sellTokens">Amount</label>
            <input type="number" class="form-control" id="sellTokens"  placeholder="Enter the amount"/>
            <div class="form-group align-center">
              <label for="toAddress">Address</label>
              <input type="text" class="form-control" id="toAddress"  placeholder="Enter buyer's address"/>
            </div>
          </div>
          <button type="button" class="btn btn-primary" onClick = {async ()=>{
            await this.initiateTrade(
              document.getElementById("toAddress").value,
              document.getElementById("sellTokens").value
            );
          }}>Sell</button>
        </form>
		</div>
		);
  }
  async initiateTrade(to,amount){
    let trades = this.props.trades;
    let accounts = this.props.accounts;
    try{
        await trades.methods.initiateTrade(to,amount).send({from: accounts[0]})
        .then((receipt)=>{
            console.log(receipt);
        })
    }
    catch (err){
        console.log(err);
    }
  }
}
export default Trade;