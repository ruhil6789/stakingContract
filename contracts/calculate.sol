// SPDX-License-Identifier:MIT
pragma solidity >=0.6.0 <0.9.0;

import "hardhat/console.sol";

contract Calculate {
    uint public a;
    uint public b;
    bool d;

    constructor(uint _a, uint _b) {
        a = _a;
        b = _b;
    }

    function sum(uint _a, uint _b) public view returns (uint) {
        uint _c = _a + _b;
        console.log(" addition of a and b ", _c);
        return _c;
    }

    function sub(uint _a, uint _b) public view returns (uint) {
        console.log("sub of two number",_a,_b);
        require(_a > _b,"a is smaller");
        uint _c = _a - _b;
        console.log("c", _c);
        return _c;
    }

    function mul(uint _a, uint _b) public view returns (uint) {
        require(a != 0, " a  is zero ");
        require(b != 0, " b is zero ");
        uint _c = a * b;
        console.log("multiply two numbers");
        return _c;
    }

    function div(uint _a, uint _b) public view returns (uint) {
        require(a != 0, "cannot divide ");
        uint _c = uint(a / b);
        console.log("division of two numbers");
        return _c;
    }
}
