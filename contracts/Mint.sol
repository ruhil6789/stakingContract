//SPDX License-identifier:MIT
pragma solidity >=0.6.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IMint {
    function mint(address Own, uint amount) external;

    function transfer(address owner, uint amount) external;
}
