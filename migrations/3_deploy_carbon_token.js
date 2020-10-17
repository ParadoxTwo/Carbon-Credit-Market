const Carbon = artifacts.require("./Carbon.sol");

module.exports = function(deployer) {
  deployer.deploy(Carbon);
};
