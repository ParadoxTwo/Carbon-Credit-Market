var express = require('express');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
var app = express();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "under detect verify bean lobster weapon jelly cost hungry evidence tiger parade";
var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/cbfff3438831426484f5b7bf334709b2");
const web3 = new Web3(provider);
let Users, Carbon;
let userAddress = "0xe09aEb9BB14262A053a5f40932ac7F665CFEd66c";
let carbonAddress = "0x1DD72067DD8a49b258cCafD552F80814012cE569";
app.use(express.json())

fs.readFile('./abis/Users.json','utf-8',(err,jsonString)=>{
   Users = JSON.parse(jsonString);
});

fs.readFile('./abis/Carbon.json','utf-8',(err,jsonString)=>{
   Carbon = JSON.parse(jsonString);
});

app.post('/register',async function(req,res){
   var user = req.body.address;
   var name = req.body.name;
   var userid = req.body.userid;
   console.log("Request: %s, %s, %s",user,name,userid);
   let users, carbon, network, networkId, allowance;
   accounts = await web3.eth.getAccounts();
   networkId = await web3.eth.net.getId();
   usersNetwork = Users.networks[networkId];
   carbonNetwork = Carbon.networks[networkId];
   if(usersNetwork&&carbonNetwork){
      users = new web3.eth.Contract(Users.abi, usersNetwork.address);
      carbon = new web3.eth.Contract(Carbon.abi, carbonNetwork.address, {from: accounts[0], gas: '1000000', gasPrice: '100000000000'});
      await users.methods.register(user,name,userid).send({from: accounts[0]})
      .then((receipt)=>{
         console.log(receipt);
      })
      try{
         await carbon.methods.approve(user, 1000000000000).send({from: accounts[0], gas: '1000000', gasPrice: '100000000000'}) //8000029
         .then((receipt)=>{
            console.log(receipt);
         })
      }
      catch(err){
         console.log(err);
      }
      res.sendStatus(200);
   }
   else{
      console.log("Could not detect contract.");
      res.sendStatus(500);
  }
})
app.post('/addTenement',async function(req,res){
   var tenement = req.body.tenement,
   owner = req.body.owner, 
   sequestrationRate = req.body.sequestrationRate, 
   coordinates = JSON.parse(req.body.coordinates);
   console.log("Request: %s, %s, %d, %s",tenement, owner, sequestrationRate, coordinates);
   let users, networkId;
   accounts = await web3.eth.getAccounts();
   networkId = await web3.eth.net.getId();
   usersNetwork = Users.networks[networkId];
   carbonNetwork = Carbon.networks[networkId];
   if(usersNetwork&&carbonNetwork){
      users = new web3.eth.Contract(Users.abi, usersNetwork.address);
      carbon = new web3.eth.Contract(Carbon.abi, carbonNetwork.address);
      await users.methods.addTenement(tenement, owner, sequestrationRate, coordinates).send({from: accounts[0]})
      .then((receipt)=>{
         console.log(receipt);
      })
      try{
         await carbon.methods.transfer(owner, sequestrationRate).send({from: accounts[0], gas: '1000000', gasPrice: '100000000000'})
         .then((receipt)=>{
            console.log(receipt);
         })
      }
      catch(err){
         console.log(err);
      }
      res.end("Successfully added tenement");
   }
   else{
      console.log("Could not detect contract.");
      res.sendStatus(500);
      res.end("Could not detect contract");
  }
})
app.post('/modifyTenement',async function(req,res){
   console.log("start");
   var tenementId = req.body.tenementId,
   sequestrationRate = req.body.sequestrationRate,
   owner = req.body.owner, 
   coordinates = JSON.parse(req.body.coordinates);
   console.log("Request: %d, %s, %d",tenementId, coordinates, sequestrationRate);
   let users, network, networkId;
   accounts = await web3.eth.getAccounts();
   networkId = await web3.eth.net.getId();
   usersNetwork = Users.networks[networkId];
   carbonNetwork = Carbon.networks[networkId];
   if(usersNetwork&&carbonNetwork){
      users = new web3.eth.Contract(Users.abi, usersNetwork.address);
      carbon = new web3.eth.Contract(Carbon.abi, carbonNetwork.address);
      await users.methods.modifyTenement(tenementId, coordinates, sequestrationRate).send({from: accounts[0]})
      .then((receipt)=>{
         console.log(receipt);
      })
      try{
         await carbon.methods.transfer(owner, sequestrationRate).send( {from: accounts[0], gas: '1000000', gasPrice: '100000000000'})
         .then((receipt)=>{
            console.log(receipt);
         })
      }
      catch(err){
         console.log(err);
      }
      res.sendStatus(200);
   }
   else{
      console.log("Could not detect contract.");
      res.sendStatus(500);
  }
})
app.post('/changeTenementOwner',async function(req,res){
   var tenementId = req.body.tenementId,
   oldOwner = req.body.oldOwner,
   allowance = req.body.allowance, 
   newOwner = req.body.newOwner;
   console.log("Request: %d, %s, %s",tenementId, oldOwner, newOwner);
   let users, carbon, network, networkId;
   accounts = await web3.eth.getAccounts();
   networkId = await web3.eth.net.getId();
   usersNetwork = Users.networks[networkId];
   carbonNetwork = Carbon.networks[networkId];
   if(usersNetwork&&carbonNetwork){
      users = new web3.eth.Contract(Users.abi, usersNetwork.address);
      carbon = new web3.eth.Contract(Carbon.abi, carbonNetwork.address);
      if(newOwner!=accounts[0])
         await carbon.methods.increaseAllowance(newOwner, allowance).send({from: accounts[0]})
         .then((receipt)=>{
            console.log(receipt);
         })
      await users.methods.changeTenementOwner(tenementId, oldOwner, newOwner).send({from: accounts[0]})
      .then((receipt)=>{
         console.log(receipt);
      })
      res.sendStatus(200);
  }
  else{
      console.log("Could not detect contract.");
      res.sendStatus(500);
  }
})
app.post('/getTenements', async function(req,res){
   var owner = req.body.owner;
   console.log("Request: %s",owner);
   let users, networkId;
   var tenements = [];
   accounts = await web3.eth.getAccounts();
   networkId = await web3.eth.net.getId();
   usersNetwork = Users.networks[networkId];
   if(usersNetwork){
      users = new web3.eth.Contract(Users.abi, usersNetwork.address);
      console.log(users.options.address);
      await users.methods.tenementCount().call({from: accounts[0]}).then(async(tenementCount)=>{
         console.log(tenementCount);
         var i = 0;
         for(;i<tenementCount;i++){
            await users.methods.tenements(i).call({from: accounts[0]}).then(async(tenement)=>{
               if(tenement[3]==owner)
                  tenements.push(tenement);
                  console.log(tenement);
            });
         }
      })
      // console.log(tenementCount);
      //    var i = 0;
      
      res.end(JSON.stringify(tenements));
  }
  else{
      console.log("Could not detect contract.");
      res.sendStatus(500);
  }
})
var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at %s", port)
})