//SPDX License-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stakee{
IERC20 public stakingToken;
uint public random;
// Stake public stake;

  uint count=1;
  uint timestamp; 
address[] public stakers;

    constructor(address _stakeToken) {
  
      stakingToken = IERC20(_stakeToken);
          }
   
   
mapping(address=> uint) public balances;   
mapping(address=>uint) public UniqueOwner;
mapping(address=>bool) public staked;

 function stake( uint amount) public returns(uint){
 balances[msg.sender] = amount;
 stakingToken.balanceOf(address(this));
 //stakingToken.balancesOf(address(this));
 
//require(uniqueOwner[msg.sender] != staked[msg.sender]);
 if(staked[msg.sender] == false){
    stakers.push(msg.sender);
    staked[msg.sender] =true;
    stakingToken.transferFrom(msg.sender, address(this),amount);
    UniqueOwner[msg.sender]  = count;
     }else{
        revert(" cannot stake twice");
     }
    return  count++;

 }

function getrandomNumber(uint number) public{

random = uint(keccak256((abi.encodePacked(block.timestamp,block.difficulty,msg.sender)))) % number;
}


function withdraw() public{
//  UniqueOwner[msg.sender] =getrandomNumber( randNo);
//  uint stakeId = UniqueOwner[msg.sender];
   console.log("balance", balances[msg.sender]);
  require(block.timestamp > 10," can withdraw after 10 sec");

 if(UniqueOwner[msg.sender] == random){
//   require(block.timestamp >10," should  add 10 percent to the owner");
  stakingToken.transfer(msg.sender,(balances[msg.sender])*10/100 + balances[msg.sender]);
  // require(block.timestamp >48," should  add 10 percent to the owner"); 
 }
 else{
//   require(block.timestamp <1,"should reflect the amount without any  ");
  stakingToken.transfer(msg.sender,balances[msg.sender]);
 }
//  stakingToken.balanceOf(address(this));  
//  if(block.timestamp > 48){
//     stakeId = (stakeId +1) /100;
//  }
//  stakingToken.transfer(address(this),10000);
}

}


 contract Stake is ERC20{


     constructor(string memory _name,string memory _symbol) ERC20(_name,_symbol){
        _mint(msg.sender,10000);
     }
 function mint(address owner, uint amount) public{
 _mint( owner, amount);

 }
}