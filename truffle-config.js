require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "under detect verify bean lobster weapon jelly cost hungry evidence tiger parade";
module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/cbfff3438831426484f5b7bf334709b2");
      },
      network_id: '3',
    },
  },
  contracts_directory: './src/backend_api/contracts/',
  contracts_build_directory: './src/backend_api/abis/',
  compilers: {
    solc: {
      version: "0.6.6",
      parser: "solcjs",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
