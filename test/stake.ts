//import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Stake, Stake__factory, Staking, Staking__factory } from "../typechain-types";
import { mineBlocks } from "./utilities/utilities";

describe("staking",async() =>{
let stake: Stake;
let reward: Stake;

let staking: Staking;
let owner: SignerWithAddress;
let signers: SignerWithAddress[];

beforeEach("contract",async()=>{
    signers = await ethers.getSigners();
    owner = signers[0];
    stake = await new Stake__factory(owner).deploy("Stakiing", "STK");
    reward = await new Stake__factory(owner).deploy("Reward", "RWD");
    staking = await new Staking__factory(owner).deploy(stake.address,reward.address);
})
        it("mint tokens", async()=>{
            console.log("initial balance", await stake.balanceOf(signers[1].address));
            await stake.connect(owner).mint(signers[1].address,10000000);
            console.log("balance", await stake.balanceOf(signers[1].address));
        })

    it("should stake the token",async()=>{
    console.log("stake token by the owner");
    await stake.connect(owner).mint(owner.address,1000000000000);
    await stake.connect(owner).approve(staking.address,10000000000);
    await staking.connect(owner).staked(owner.address,10000);
      
})
it("should return all staked due to early stake",async()=>{
 console.log("stake token by the owner");
    await stake.connect(owner).mint(owner.address,1000000000000);
    await stake.connect(owner).approve(staking.address,10000000000);
    await staking.connect(owner).staked(owner.address,10000);
    await mineBlocks(ethers.provider,100); 
   console.log("staked balance", await staking.connect(owner).getStaked(owner.address));
   console.log("withdraw all  staked");
})

  it.only(" should withdraw the amount", async()=>{
    console.log(" withdraw amount");
    await stake.connect(owner).mint(owner.address,100000000000);
    // await stake.connect(owner).mint(staking.address,100000000000);

    await stake.connect(owner).approve(staking.address,100000000000);
    await staking.connect(owner).staked(owner.address,1000);
    // await mineBlocks(ethers.provider,100);
    console.log("withdraw amount",await stake.balanceOf(owner.address));
    await staking.connect(owner).withdraw(owner.address);
    console.log("withdraw amount",await stake.balanceOf(owner.address));
    //expect(await stake.balanceOf(owner.address)).to.be.equal(1);
    
  })

it("should withdraw before timeperiod",async()=>{
 console.log("early withdraw");
 await stake.connect(owner).mint(owner.address,1000000000000);
 await stake.connect(owner).approve(staking.address,1000000000000);
   await mineBlocks(ethers.provider,1000);
 await staking.connect(owner).staked(owner.address,100);
 await stake.connect(signers[1]).mint(signers[1].address,1000000000000);
 await stake.connect(signers[1]).approve(staking.address,1000000000000);
 
 await staking.connect(signers[1]).staked(signers[1].address,10000);
 await mineBlocks(ethers.provider,1000);
 await staking.connect(owner).withdraw(owner.address);
  console.log("staked balance", await staking.connect(owner).getStaked(owner.address));
  console.log("withdraw all  staked");
})                                                
 it("should  return staked",async()=>{
 await stake.connect(owner).mint(owner.address,1000000000000);
 await stake.connect(owner).approve(staking.address,1000000000000);
 await mineBlocks(ethers.provider,10000);
 await staking.connect(owner).staked(owner.address,100);
 await staking.connect(owner).getStaked(owner.address); 

})

it("should reward the user",async()=>{

await stake.connect(owner).mint(owner.address,10000000000000);
await stake.connect(owner).approve(staking.address,1000000000000);

await staking.connect(owner).rewardPerToken();
})
})