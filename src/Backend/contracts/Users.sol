//Designed by Amit & Edwin
//Implemented by Edwin
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


contract Users {
    mapping(address=>string) public name;
    mapping(address=>string) userid;
    address public system;
    mapping(uint256=>Tenement) public tenements;
    mapping(address=>uint256) public sequestrationRate;
    uint256 public tenementCount;
    mapping(uint256=>string[][]) public coordinates; //using id as identifyer as a user can have multiple tenements
    
    struct Tenement {
        string name;
        uint256 id;
        uint256 sequestrationRate;
        address owner;
        //cannot include coordinates here as struct doesn't support mappings
        //stored coordinates in the public variable called coordinates. it is connected to the tenements via Tenement.id
    }
    
    constructor() public{
        system = msg.sender;
        tenementCount = 0;
    }
    function register(address payable _user,string memory _name, string memory _userid) public{
        require(_user!=address(0),"user's address cannot be empty.");
        require(keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked("")) , 
        "name cannot be empty.");
        require(keccak256(abi.encodePacked(_userid)) != keccak256(abi.encodePacked("")) , 
        "userid cannot not be empty.");
        require (msg.sender==system, "Only system can register a user.");
        name[_user] = _name;
        userid[_user] = _userid;
        
    }
    
    function addTenement (string memory _name, address payable _owner , uint256 _sequestrationRate, string[][] memory _coordinates) public{
        require(msg.sender==system, "Only system can add tenements");
        require(_owner!=address(0),"owner's address cannot be empty.");
        require(keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked("")) , 
        "name cannot be empty.");
        uint256 _id = tenementCount;
        Tenement memory tenement = Tenement(_name, _id, _sequestrationRate, _owner);
        coordinates[_id] = _coordinates;
        tenements[_id] = tenement;
        tenementCount++;
        sequestrationRate[_owner] += _sequestrationRate;
    }
    function modifyTenement(uint256 _id, string[][] memory _coordinates, uint256 _sequestrationRate) public {
        require(msg.sender == system, "Only system can modify tenements");
        require(tenements[_id].owner!=address(0),"This tenement doesn't exist!");
        coordinates[_id] = _coordinates;
        sequestrationRate[tenements[_id].owner]-=tenements[_id].sequestrationRate;
        sequestrationRate[tenements[_id].owner]+=_sequestrationRate;
        tenements[_id].sequestrationRate = _sequestrationRate;
    }
    function changeTenementOwner(uint256 _id, address _oldOwner, address _newOwner) public{
        require(msg.sender==system, "Only system can change tenement owners");
        require(_oldOwner!=address(0),"current owner's address cannot be empty.");
        require(_newOwner!=address(0),"new owner's address cannot be empty.");
        require(tenements[_id].owner == _oldOwner, "Only current owner can request to change the owner.");
        tenements[_id].owner = _newOwner;
        sequestrationRate[_oldOwner] -= tenements[_id].sequestrationRate;
        sequestrationRate[_newOwner] += tenements[_id].sequestrationRate;
    }
}