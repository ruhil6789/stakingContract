// SPDX License-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;

contract New {
    receive() external payable {}

    fallback() external payable {}

    function sendviatransfer(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function sendviaSend(address payable _to, address payable _from)
        public
        payable
    {
        bool sent = _to.send(msg.value);
        require(sent, "failed to send ether");
    }

    function sendviacall(
        address payable _to,
        address payable _from,
        address payable _ff
    ) public payable {
        (bool sent, bytes memory message) = _to.call{value: msg.value}("");
        require(sent, "failed to sent ether");
    }
}
