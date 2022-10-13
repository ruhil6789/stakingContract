// SPDX LIcense-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;

contract Counters {
    uint public Count;

    function inc() public {
        Count++;
    }

    function dec() public {
        Count--;
    }

    function get() public view returns (uint) {
        return Count;
    }
}
