// SPDX-License-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;
 contract Message{

string public message;

 constructor(string memory initialmessage){
     message = initialmessage;

 }

 function setmessage(string memory newmessage) public {
   message = newmessage;

 }
 function getmessage() public view returns(string memory){
    return message;

 }
 }