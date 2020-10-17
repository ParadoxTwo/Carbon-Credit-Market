/*
	Designed and Developed by Aswin & Nimisha
*/
import React from 'react';
class Wallet extends React.Component  {
	render() {
	return (
	<div className="mx-auto">
		<h2> Wallet Details</h2>
		<div className="carbonTokens">Carbon Tokens : {this.props.carbonTokens}</div>
		<div className="ethers">Ethers : {this.props.ethers}</div>
		<div className="exchangeRate">Exchange Rate : {this.props.exchangeRate}</div>
	</div>
);
}
}

export default Wallet;