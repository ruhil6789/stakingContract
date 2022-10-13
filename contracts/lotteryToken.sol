//SPDX-License-Identifier:MIT

pragma solidity >=0.6.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract token is ERC20 {
    address tokenOwner;

    constructor(
        string memory name,
        string memory symbol,
        address ercLottery
    ) public ERC20("SAC", "sac") {
        _mint(tokenOwner, 100000);
    }

    function mint(address ercLottery) public {
        _mint(ercLottery, 100000);
    }
}

contract ercLottery {
    address public tokenowner;
    address[] public multiplayer;
    address ab;
    uint amount;

    constructor(
        address _token,
        address _ab,
        uint _amount
    ) public {
        tokenowner = _token;
        ab = _ab;
        amount = _amount;
    }

    modifier onlyOwner() {
        require(msg.sender == tokenowner, "not the tokenowner");
        _;
    }

    function enter(uint a) public payable onlyOwner {
        require(a >= (500 * 1) ^ 18, "token is less");
        IERC20(ab).transfer(address(this), a);
        multiplayer.push(msg.sender);
    }

    function getbalance() public view returns (uint) {
        return address(this).balance;
    }

    function random() private onlyOwner returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        multiplayer.length
                    )
                )
            );
    }

    function pickWinner(address) public onlyOwner {
        uint index = random() % multiplayer.length;
        multiplayer = new address[](0);
        IERC20(tokenowner).approve(msg.sender, amount);
        IERC20(tokenowner).transfer(msg.sender, amount);
        // multiplayer[index].transfer(address(this).balance, amount);
        // multiplayer = new address[](0);
    }
}
