//SPDX License_Identifier:MIT

pragma solidity >0.6.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Mint.sol";

// interface Mint {
//     function mint(address Own, uint amount) external;
// }

contract Staking {
    IERC20 public stakingreward;
    IMint public rewardToken;

    // address public stakingreward;
    // address public rewardToken;

    uint rewardRate = 100;
    uint totalSupply;
    uint rewardPerTokenn;
    uint lastUpdateTime;
    uint StartTime;

    // address immutable asReward;

    mapping(address => uint) public balances;

    mapping(address => uint) public timeCheck;

    mapping(address => uint) public userRewardPerToken;

    mapping(address => uint) public rewards;

    mapping(address => bool) public status;
    struct Invest {
            uint amount;
            uint timeStamp;
        }
    mapping(address => Invest[]) public Investor;
    


    modifier updateReward(address account) {
        console.log("user before update");
        rewardPerTokenn = rewardperToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerToken[account] = rewardPerTokenn;
        _;
    }

    constructor(address _stakingRewards, address _rewardtoken)
        updateReward(msg.sender)
    {
        stakingreward = IERC20(_stakingRewards);
        rewardToken = IMint(_rewardtoken);
    }

    // user stake their token

    function stake(address stakeStaker, uint amount)
        public
        updateReward(msg.sender)
    {
        require(amount>0, "zero amount");
        balances[stakeStaker] += amount;
        console.log(stakeStaker);
        totalSupply += amount;

        bool sent = IERC20(stakingreward).transferFrom(
            stakeStaker,
            address(this),
            amount
        );
        status[stakeStaker] = true;
        if (!sent) {
            console.log(" staking cannot be possible");
        }
        //require(balances[stakeStaker] == 0, "you already have stake with us");

        Investor[stakeStaker].amount = amount;
        Investor[stakeStaker].timeStamp = block.timestamp;
    }

    // to check the user reward
    function rewardperToken() public view returns (uint) {
        if (totalSupply == 0) {
            return rewardPerTokenn;
        } else {
            rewardPerTokenn +
                ((block.timestamp - lastUpdateTime) * rewardRate * 1e18) /
                totalSupply;
        }
    }

    // user to withdraw
    function withdraw(address owner) public updateReward(msg.sender) {
        timeCheck[owner] = block.timestamp;
        Investor[owner].amount;
        IERC20(stakingreward).balanceOf(address(this));
        status[owner] == true;

        rewardToken.mint(owner, 10000);
        // rewardToken.balanceOf(address(this));
        status[owner] == true;
        if (block.timestamp > Investor[owner].timeStamp + 1) {
        // bool success = rewardToken.transfer(
        //         owner,
        //         Investor[owner].amount + ((Investor[owner].amount * 10) / 100)
        //     );
            rewardToken.transfer(owner,Investor[owner].amount + ((Investor[owner].amount * 10) / 100));

            // if (!success) {
            //     console.log("cannot withdraw");
            // }
        }
    }

    function earned(address account) public view returns (uint) {
        uint currentbalance = balances[account];
        uint amountPaid = userRewardPerToken[account];
        uint pastReward = rewards[account];
        uint _earned = ((currentbalance * (currentbalance - amountPaid)) /
            1e18) + pastReward;
        return _earned;
    }

    function getStaked(address account) public view returns (uint) {
        return balances[account];
    }
}

contract Stakee is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        _mint(msg.sender, 10000);
    }

    function mint(address stakeToken, uint amount) public {
        _mint(stakeToken, amount);
    }
}

contract AsReward is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        _mint(msg.sender, 5000);
    }

    function mint(address rewardToOwner, uint amount) public {
        _mint(rewardToOwner, amount);
    }
}
