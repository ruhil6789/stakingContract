import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { New__factory, Staking__factory } from "../typechain-types";
import { stakingSol } from "../typechain-types/contracts";


describe("Staking,stake",function (){

async function callFixture(){
  
    let totalSupply= 1000000;
   //et stakingToken, rewardToken;
 //let amount =100;
    //const [Stake, Staking] =await ethers.getContractFactory("stake","staking");
   //await deployments.fixture(["Stake", "staking"]);
     let  Staking = await ethers.getContractFactory("Staking");
    let  Stake= await ethers.getContractFactory("Stake");
    const New1 = await Stake.deploy("Sa","s");

    let  Reward= await ethers.getContractFactory("Stake");
    const New2 = await Stake.deploy("Re","r");
    let stakingToken = New1.address;
    let rewardToken = New2.address;
    const stakeAmount = ethers.utils.parseEther("100000");
     let x =await ethers.getSigners();
     let owner = x[0]; // address(0)
     let reciever = x[1]; // address(1)
//  rewardToken =ethers.getSigner();
    const  New= await Staking.deploy(stakingToken,rewardToken);
    
    return {Stake, Staking ,stakeAmount, New, New1,owner, reciever,totalSupply}
}

describe("deployment",function () {
   it(" should  stake the amount", async function () {

  const {Stake, Staking, stakeAmount,New,owner,reciever,New1} = await loadFixture(callFixture);
  await New1.mint(owner.address,100000000000000000000000000);
  await New1.approve(New.address,1000000000000000000000000);
  await New.staked(10000);

});
 it( "should stake withun timeperiod", async function(){
const {New1, New, owner, Stake,Staking,stakeAmount,reciever}= await loadFixture(callFixture);
        console.log("heo");

  await New1.mint(owner.address,100000000000);
  
  await New1.approve(New.address,100000000000);
  console.log("helqqqlo");

  await New.staked(1000);
//  expect(await New.staked(1000)).to.equal(1000);

 });
  it("should transfer amount",async function(){
 const { Stake,Staking,stakeAmount,New,New1, owner} = await loadFixture(callFixture);
  console.log("before transfer balance is ");

  await New1.mint(owner.address,10000000000000);
  await New1.approve(New.address,100000000000000);  await New.staked(120);
 console.log("after transfer balance is");
  });
 it("should revert if sent  fail ", async function(){
  const{ Staking, Stake, stakeAmount, New,New1,owner} = await loadFixture(callFixture);
  await New1.mint(owner.address,10000000000000);
  await New1.approve(New.address,100000000000000);
  expect(await New.staked(100)).to.be.revertedWith("amount is not sent");

});
});

describe("rewardPerToken",function(){
  it(" should reward the user with token",async function () {
    const {Staking, Stake, stakeAmount,New, New1,owner}= await loadFixture(callFixture);
    console.log("reward the user with token");
 await New1.mint(owner.address,10000000000000);
  await New1.approve(New.address,100000000000000);
    await New.rewardPerToken();
  
});
it("should supply the amount",async function () {
    const {Staking, Stake, New, stakeAmount,New1, owner,totalSupply} = await loadFixture(callFixture);
    console.log(" transfer the amount");
    
     await New1.mint(owner.address,10000000000000);
    // await New1.approve(New.address,100000000000000);
    expect (await New.rewardPerToken()).to.equal(1000000);


});
//error
it("should revert when totalSupply is zero",async function(){
  const { Staking,Stake,stakeAmount,New,New1,owner} = await loadFixture(callFixture);
  await New1.mint(owner.address,10000000000000);
  await New1.approve(New.address,100000000000000);
  expect(await New.rewardPerToken()).to.be.revertedWith("supply i zero");
});
});

describe("withdraw",function (){
it("should withdraw the  amount",async function(){
const {Staking, Stake, New, stakeAmount,owner,New1,reciever}=await loadFixture(callFixture);
//  await New1.mint(owner.address,10000000000000);
 console.log("balance", await New1.balanceOf(owner.address));
  await New1.connect(owner).approve(New.address,10);

// await New.connect(reciever).withdraw(10000000);

  await New.connect(owner).staked(10);
  console.log("staked balance:", await New.connect(owner).getStaked(owner.address));
console.log("withdraw all the funds");
});
// it("should revert when withdraw is not successful",async function(){
//  const {Staking, Stake,New,stakeAmount,owner,New1,reciever}= await loadFixture(callFixture);
 
//  console.log("balance",await New1.balanceOf(owner.address));
//  await New1.coonect(owner).approve(New.address)
//  expect(await New.withdraw(50));
//  console.log(" amount is withdrawn");

// });
//only
 it( "should withdraw before time",async function(){
  const { New,Staking, Stake, stakeAmount,owner,New1,reciever} = await loadFixture(callFixture);
  console.log("balance", await New1.balanceOf(owner.address));
  await New1.connect(owner).approve(New.address,10);
 //console.log("withdraw failed", await New.connect(owner).withdraw(5));
 //await New.connect().withdraw(10);
 await New1.mint(owner.address,10000000000000);
 await New1.approve(New.address,100000000000000);
 await New.connect(owner).staked(10);
  console.log("staked balance:", await New.connect(owner).getStaked(owner.address));
  // await New.connect(owner).staked(10);
  // console.log("staked balance:", await New.connect(owner).getStaked(owner.address));
  await expect(New.withdraw(5)).to.be.revertedWith("wait for more time");

 });
 });

describe("earned",function(){

 it("should earned the  reward", async function(){
 const {New , Staking, Stake, stakeAmount}  = await  loadFixture(callFixture);
   console.log(" earned some reward on stake");
   await New.earned("0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589");
   console.log("earn some reward on staking");
 });
it("should return the  staked",async function () {
    const { New, Staking, Stake}= await loadFixture(callFixture);
    console.log("staked  return");
    await New.getStaked("0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589");
    
});

describe("mint", function(){
 it(" should  mint the token", async function(){
 const {New1,Stake, Staking, stakeAmount} =  await loadFixture(callFixture);
  await New1.mint("0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589",1000);

 });
});
});
});












