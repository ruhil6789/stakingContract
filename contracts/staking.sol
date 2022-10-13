// // SPDX License-Identifier:MIT

// pragma solidity >=0.6.0 <0.9.0;
// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// //import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

// error Staking__TransferFailed();
// error Withdraw__TransferFailed();

// contract Staking {
//     IERC20 public immutable stakingreward;
//     IERC20 public immutable rewardToken;

//     uint rewardrate = 100;
//     uint totalSupply;
//     uint rewardPerTokenn;
//     uint lastUpdateTime;
//     uint startTime;

//     address public owner;
//     mapping(address => uint) public timecheck;
//     // total staked by the user
//     mapping(address => uint) public balances;
//     // user rewarded as per Total staked
//     mapping(address => uint) public userRewardperToken;
//     //  rewards by the user
//     mapping(address => uint) public rewards;

//     mapping(address => bool) public status;
//     // modifier onlyOwner() {
//     //     require(owner = msg.sender, "not owner");
//     //     _;
//     // }
//     struct invest {
//         uint amount;
//         uint timestamp;
//     }
//     mapping(address => invest) public investor;
//     // investt[] public inv;

//     modifier updatereward(address account) {
//         console.log("hello");
//         rewardPerTokenn = rewardPerToken();
//         //require(stakedamount = block.timestamp && )
//         lastUpdateTime = block.timestamp;
//         rewards[account] = earned(account);
//         userRewardperToken[account] = rewardPerTokenn;
//         _;
//     }

//     constructor(address _stakingRewards, address _rewardtoken) {
//         owner = msg.sender;
//         stakingreward = IERC20(_stakingRewards);
//         rewardToken = IERC20(_rewardtoken);
//     }

//     // user stake their token
//     function staked(address staker, uint amount)
//         public
//         updatereward(msg.sender)
//     {
//         balances[staker] += amount;
//         console.log(staker);
//         totalSupply += amount;
//         bool sent = stakingreward.transferFrom(staker, address(this), amount);
//         status[staker] = true;
//         if (!sent) {
//             revert Staking__TransferFailed();
//         }
//         investor[staker].amount = amount;
//         investor[staker].timestamp = block.timestamp;

//         timecheck[staker] = block.timestamp;
//     }

//     //  vie wfunction to check user rewards
//     function rewardPerToken() public view returns (uint256) {
//         if (totalSupply == 0) {
//             return rewardPerTokenn;
//         } else {
//             return
//                 rewardPerTokenn +
//                 (((block.timestamp - lastUpdateTime) * rewardrate * 1e18) /
//                     totalSupply);
//         }
//     }

//     // user to withdraw token before time or after a
//     function withdraw(address staker) public updatereward(msg.sender) {
//         timecheck[staker] = block.timestamp;
//         console.log("amount", investor[staker].amount);
//         console.log("balance", stakingreward.balanceOf(address(this)));
//         require(status[staker] == true, "staked first");

//         if (block.timestamp > investor[staker].timestamp + 1) {
//             bool success = stakingreward.transfer(
//                 staker,
//                 investor[staker].amount + ((investor[staker].amount * 10) / 100)
//             );
//             if (!success) {
//                 revert Withdraw__TransferFailed();
//             }
//         } else {
//             bool success = stakingreward.transfer(
//                 staker,
//                 investor[staker].amount - ((investor[staker].amount * 10) / 100)
//             );
//             if (!success) {
//                 revert Withdraw__TransferFailed();
//             }
//         }

//         console.log("success");
//     }

//     function earned(address account) public view returns (uint) {
//         uint256 currentBalance = balances[account];

//         uint256 amountPaid = userRewardperToken[account];
//         uint256 currentRewardPerToken = rewardPerToken();
//         uint256 pastRewards = rewards[account];
//         uint256 _earned = ((currentBalance *
//             (currentRewardPerToken - amountPaid)) / 1e18) + pastRewards;

//         return _earned;
//     }

//     function getStaked(address account) public view returns (uint256) {
//         return balances[account];
//     }
// }

// contract Stake is ERC20 {
//     constructor(string memory _name, string memory _symbol)
//         ERC20(_name, _symbol)
//     {
//         _mint(msg.sender, 1000);
//     }

//     function mint(address owner, uint amount) public {
//         _mint(owner, amount);
//     }
// }
