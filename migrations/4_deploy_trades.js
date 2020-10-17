const Trades = artifacts.require("./Trades.sol");

module.exports = function(deployer) {
  deployer.deploy(Trades);
};
