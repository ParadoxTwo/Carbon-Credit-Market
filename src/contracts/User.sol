pragma solidity ^0.6.0;

contract User {
    string public name;
    string public userid;
    uint public tokens;
    struct Tenement {
        string name;
        string id;
        string source;
        address owner;
    }
    event UserInfo (
        string name,
        string userid,
        uint tokens,
        address author
    );
    constructor() public{
        name = "Edwin John";
    }
}