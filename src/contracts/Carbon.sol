pragma solidity ^0.6.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Carbon is ERC20 {
    constructor(uint256 initialSupply) ERC20("Carbon", "CRBN") public {
        _mint(msg.sender, initialSupply);
    }
}