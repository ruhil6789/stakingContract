/* //  SPDX License-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;


import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Staking{

IERC20 public stakingToken;
IERC20 public rewardToken;

constructor(address _stakingToken,address _rewardToken){

    stakingToken = IERC20(_stakingToken);
    rewardToken =IERC20(_rewardToken);
}

struct Investment{
 uint amount;
 uint timeStamp;

}

mapping(address=>Investment[]) public investor;

mapping(address=>uint) public balances;

//Investment[] public investor;

function stake(uint _amount) public {
    balances[msg.sender] = _amount;
    stakingToken.transferFrom(msg.sender,address(this), _amount);
     investor[msg.sender].push(Investment({
        amount : _amount,
        timeStamp : block.timestamp
}));
   //
  } 
function withdraw( uint _index) public {
    uint amt = investor[msg.sender][_index].amount;

    if(investor[msg.sender][_index].timeStamp + 100 > block.timestamp){
        if(amt>25){
//return original amt + some reward tokens
    
     rewardToken.transfer(msg.sender, 5);
     stakingToken.transfer(msg.sender, amt);
        }
        else{
//return original amt + lesser reward tokens
     rewardToken.transfer(msg.sender,2 );
     stakingToken.transfer(msg.sender, amt);
             }
    }
    else{
        //non maturity condition, subtract (3*amt)/100
    // investor[msg.sende await staking.connect(owner).stake(50)r][_index].amount -(3*amt)/100;
        stakingToken.transfer(msg.sender, amt-(3*amt)/100);
    }

}



    }



contract Stake is ERC20{
 constructor(string memory _name , string memory _symbol) ERC20("_name","_symbol"){
 _mint(msg.sender, 1000);
 
 }
function  mint(address sender , uint amount) public {
 _mint(sender, amount);


} 
}


contract Reward is ERC20{

 constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
    _mint(msg.sender,1000000);
 }
 function mint(uint amount )public{
    _mint(msg.sender,amount);
 } 
} */