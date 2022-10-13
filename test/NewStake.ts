import { ethers } from "hardhat";
import {  Reward,Reward__factory, Stake, Stake__factory, Staking, Staking__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Staking",async()=>{

let staking:Staking;
let stake: Stake
let reward:Reward;
let owner :SignerWithAddress;
let signers:SignerWithAddress[];

beforeEach("contract", async()=>{
  signers = await ethers.getSigners();
 owner = signers[0];
 stake = await new Stake__factory(owner).deploy("StakeToken","STK");
 reward = await new Reward__factory(owner).deploy("RewardToken","RDT");
 staking = await new Staking__factory(owner).deploy(stake.address,reward.address);

})

it("should mint token",async()=>{
console.log("initial balance",await stake.balanceOf(signers[1].address));
await stake.connect(owner).mint(signers[1].address,10000000);
console.log("balanceof",await stake.balanceOf(signers[1].address));
})
it("should stake the token",async()=>{
  await stake.connect(owner).mint(owner.address,10000000000000);
  await stake.connect(owner).approve(staking.address,1000000000000);
  await staking.connect(owner).stake(10);
  

})

it("should withdraw  the token ",async()=>{
await stake.connect(owner).mint(owner.address,1000000000);
await stake.connect(owner).approve(staking.address,10000000);
await staking.connect(owner).stake(1000);
await stake.connect(owner).approve(reward.address,100000000);
await reward.connect(owner).mint(1000);
})
it("should withdraw  if amount is more than 25",async()=>{
    await stake.connect(owner).mint(owner.address,100);
    await stake.connect(owner).approve(staking.address,50);
    // await stake.connect(owner).mint(owner.address,1000000);
    await staking.connect(owner).stake(50);

    await reward.connect(owner).mint(100);
    console.log("balance of contract staking tokens:", await stake.balanceOf(staking.address));

    await reward.connect(owner).transfer(staking.address,10);

    await staking.connect(owner).withdraw(0);
    // await reward.connect(owner).mint(reward.address,1000);
    
  

})
it("should be less than 25",async()=>{
   
    await stake.connect(owner).mint(owner.address,1000);
    await stake.connect(owner).approve(staking.address,1000);
   //console.log("balance",await stake.balanceOf(owner.address));
    await staking.connect(owner).stake(50);
   // await stake.connect(owner).mint(owner.address,1000);
    await stake.connect(owner).approve(reward.address,1000);
    await reward.connect(owner).mint(1000)
    await reward.connect(owner).transfer(staking.address,10);

    await staking.connect(owner).withdraw(0);
    //console.log("withdraw amount",await stake.balanceOf(owner.address));
    //await reward.connect(owner).mint(1000)
})







})