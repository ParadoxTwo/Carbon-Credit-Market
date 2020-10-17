//Designed by Amit & Edwin
//Implemented by Edwin
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Trades {
    mapping(address=>mapping(address=>uint256)) public tokenSale;
    mapping(address=>mapping(address=>string)) public status;
    uint256 public exchangeRate;
    Transaction[] public transactions;
    uint256 public transactionCount;
    
    struct Transaction{
        address from;
        address to;
        string status;
        uint256 tokens;
        uint256 cost;
    }
    
    constructor() public{
        transactionCount = 0;
        exchangeRate = 115606936000000000; //0.115606936 ether
    }
    
    function initiateTrade(address _to, uint256 _amount) public returns(uint256, string memory){
        
        require(msg.sender!=_to, "Can't sell to yourself.");
        tokenSale[msg.sender][_to] = _amount;
        status[msg.sender][_to] = "pending";
        Transaction memory transaction = Transaction(msg.sender, _to, "pending", _amount, exchangeRate*_amount);
        transactions.push(transaction);
        uint256 id = transactionCount;
        transactionCount+=1;
        return (id, "pending");
    }
    function initiateTradeManualRate(address _to, uint256 _amount, uint256 _exchangeRate) public returns(uint256, string memory){
        
        require(msg.sender!=_to, "Can't sell to yourself.");
        tokenSale[msg.sender][_to] = _amount;
        status[msg.sender][_to] = "pending";
        Transaction memory transaction = Transaction(msg.sender, _to, "pending", _amount, _exchangeRate*_amount);
        transactions.push(transaction);
        uint256 id = transactionCount;
        transactionCount+=1;
        return (id, "pending");
    }
    function acceptTrade(address payable _from) public payable returns(uint256, string memory){
        require(keccak256(abi.encodePacked((status[_from][msg.sender]))) == keccak256(abi.encodePacked(("pending"))) , 
        "This transaction doesn't exist, is being finalized or is already over.");
        require(msg.sender!=_from, "Can't buy from yourself.");
        require(msg.value>=tokenSale[_from][msg.sender]*exchangeRate, "You did not pay the required amount.");
        uint256 id = 0;
        for(;id<transactionCount;id++){
            if(transactions[id].from==_from &&transactions[id].to==msg.sender){
                break;
            }
        }
        status[_from][msg.sender] = "finalizing";
        transactions[id].status = "finalizing";
        return(id, "finalizing");
    }
    function acceptTradeManual(address payable _from, uint256 _id) public payable returns(uint256, string memory){
        require(keccak256(abi.encodePacked((status[_from][msg.sender]))) == keccak256(abi.encodePacked(("pending"))) , 
        "This transaction doesn't exist, is being finalized or is already over.");
        require(msg.sender!=_from, "Can't buy from yourself.");
        require(msg.value>=transactions[_id].cost, "You did not pay the required amount.");
        status[_from][msg.sender] = "finalizing";
        transactions[_id].status = "finalizing";
        return(_id, "finalizing");
    }
    //cancelTrade function in future
    function finalizeTrade(address payable _to) public returns(uint256, string memory){
        require(keccak256(abi.encodePacked((status[msg.sender][_to]))) == keccak256(abi.encodePacked(("finalizing"))) , 
        "This transaction doesn't exist, still awaiting approval or is already over.");
        require(msg.sender!=_to, "Can't sell to yourself.");
        uint256 id = 0;
        for(;id<transactionCount;id++){
            if(transactions[id].from==msg.sender &&transactions[id].to==_to){
                break;
            }
        }
        tokenSale[msg.sender][_to] = 0;
        msg.sender.transfer(transactions[id].cost);
        status[msg.sender][_to] = "success";
        transactions[id].status = "success";
        return(id, "success");
    }
    
}
