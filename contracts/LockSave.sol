// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract LockSave {

    struct Saving {
        address owner;
        uint value;
        uint timestamp;
        uint withdrawTimestamp;
    }

    mapping (address => uint[]) private addressByTimestamps;

    mapping (uint => Saving) private timestampBySavings;

    error UnauthorizedAmount(uint amount, address sender);

    error UnauthorizedWithdrawTime(uint withdrawTimestamp, address sender);

    modifier isValidSaving (uint withdrawTimestamp) {
        if(msg.value < 1){
            revert UnauthorizedAmount({amount: msg.value, sender: msg.sender});
        }
        if(withdrawTimestamp > block.timestamp){
            revert UnauthorizedWithdrawTime({withdrawTimestamp: withdrawTimestamp, sender: msg.sender});
        }
        _;
    }

    function save(uint withdrawTimestamp) public isValidSaving(withdrawTimestamp) payable returns (uint value, uint timestamp, uint withdrwaTimestamp) {

        Saving memory saving = Saving({
            owner: msg.sender,
            value: msg.value,
            timestamp: block.timestamp,
            withdrawTimestamp: withdrawTimestamp
        });

        addressByTimestamps[msg.sender].push(timestamp);
        timestampBySavings[timestamp] = saving;

        return (msg.value, timestamp, withdrawTimestamp);
    }

    error NoSavingsFound(address sender);

    modifier hasSavings(){
        if(addressByTimestamps[msg.sender].length < 1){
            revert NoSavingsFound(msg.sender);
        }
        _;
    }

    modifier isWithdrawTime(uint timestamp) {
        Saving memory saving = timestampBySavings[timestamp];

        if(saving.owner == msg.sender && saving.withdrawTimestamp <= block.timestamp){
            _;
        } else {
            revert UnauthorizedWithdrawTime({withdrawTimestamp: saving.withdrawTimestamp, sender: msg.sender});
        }
    }

    error withdrawalFailed(uint timestamp, uint withdrawTimestamp);

    function withdraw(uint savingTimestamp) public hasSavings isWithdrawTime(savingTimestamp) returns (uint value, uint savingsCount, uint savingsTimestamps) {

        Saving memory saving = timestampBySavings[savingTimestamp];
        delete timestampBySavings[savingTimestamp];
        
        for(uint i=0; i < addressByTimestamps[msg.sender].length; i++) {
            if(addressByTimestamps[msg.sender][i] == savingTimestamp){
                delete addressByTimestamps[msg.sender][i];
                break;
            }
        }

        (bool sent,) = payable(msg.sender).call{value: saving.value}("");
        if(!sent){
            revert withdrawalFailed({timestamp: block.timestamp, withdrawTimestamp:saving.withdrawTimestamp});
        }

        return (saving.value, addressByTimestamps[msg.sender].length, savingsTimestamps);

    }

    function getSavings() public view returns (Saving[] memory savings) {
        Saving[] memory ownerSavings = new Saving[](addressByTimestamps[msg.sender].length);

        for(uint i; i<addressByTimestamps[msg.sender].length; i++){
            uint timestamp = addressByTimestamps[msg.sender][i];
            Saving memory saving = timestampBySavings[timestamp];
            ownerSavings[i] = (saving);
        }

        return ownerSavings;
    }

}