require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "under detect verify bean lobster weapon jelly cost hungry evidence tiger parade";
module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/cbfff3438831426484f5b7bf334709b2");
      },
      network_id: '4',
    },
    // development: {
    //   provider: "HTTP://127.0.0.1:7543",
    //   network_id: '5777',
    // }
  },
  contracts_directory: './src/backend/contracts/',
  contracts_build_directory: './src/backend/abis/',
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
