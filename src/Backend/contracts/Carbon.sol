pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Carbon is ERC20 {
    constructor() ERC20("Carbon", "CRBN") public {
        _mint(msg.sender, 1000000000000000000000000000000000000000000000000000000000000000);
    }
}