import {ethers} from "hardhat";
import { AsReward, AsReward__factory, Stakee, Stakee__factory, Staking__factory, Stking, Stking__factory } from "../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai"; 



describe("stakin1",async()=>{
 let staking1:Stking;
 let stakeToken :Stakee;
 let rewardToken :AsReward;


 let owner:SignerWithAddress;
 let signers: SignerWithAddress[];

beforeEach("contract",async()=>{
 signers =await ethers.getSigners();
 owner = signers[0];
 //staking1 =await new Stking__factory(owner).deploy("Stking","STk");
 rewardToken= await new AsReward__factory(owner).deploy("asReward","reward");
 stakeToken = await new Stakee__factory(owner).deploy("Stake","St");

 staking1 = await new Stking__factory(owner).deploy(stakeToken.address, rewardToken.address);
})


it("should mint the token",async()=>{
console.log("initial balance",await stakeToken.balanceOf(signers[1].address));

await stakeToken.connect(owner).mint(signers[1].address,10000000);
console.log("balance",await stakeToken.balanceOf(signers[1].address));

})
 it("should stake the token", async()=>{
 console.log("stake the token");
 await stakeToken.connect(owner).mint(owner.address,10000000000);
 await stakeToken.connect(owner).approve(staking1.address,10000000000);
 await staking1.connect(owner).stake(owner.address,100000);
  })

  it("should return  all stake because of  reward token",async()=>{
 console.log(" before reward token to be staked");
 await rewardToken.connect(owner).mint(owner.address,10000000000);
 await rewardToken.connect(owner).approve(staking1.address,10000000000);
 expect (await staking1.connect(owner).stake(owner.address,1000000000)).to.be.revertedWith("ERC20: insufficient allowance");
//  await rewardToken.connect(owner).mint(signers[2].address,10000000);
//  expect(console.log("should revert",await staking1.connect(owner).)
console.log("failed due to staking of reward token")  
})
  it("should transfer the token ",async()=>{

  await stakeToken.connect(owner).mint(owner.address,100000000000);
  await stakeToken.connect(owner).approve(staking1.address,100000000000);
  await staking1.connect(owner).stake(owner.address,1000000000000);
  //await staking1.connect(owner).sta
  })
 it.only("should withdraw the token",async()=>{
  console.log("before withdraw");
  console.log("initial balance", await stakeToken.balanceOf(signers[1].address));
  await stakeToken.connect(owner).mint(owner.address,100000000000);
  await stakeToken.connect(owner).approve(staking1.address,100000000000);
 // await stakeToken.connect(owner).approve(rewardToken.address,1000000000);
  await staking1.connect(owner).stake(owner.address,1000);
  console.log("between the  balance", await rewardToken.balanceOf(signers[1].address));
  console.log("withdraw amount",await stakeToken.balanceOf(owner.address));
  console.log("withdraw",await rewardToken.balanceOf(owner.address));
  await staking1.connect(owner).withdraw(owner.address);
  console.log("withdraw amount",await rewardToken.balanceOf(owner.address));

 })
 it("should withdraw  before  timeperiod ",async()=>{
 console.log("withdraw amount");
await stakeToken. connect(owner).mint(owner.address,10000000000);
await stakeToken.connect(owner).approve(staking1.address,100000000000);
await staking1.connect(owner).withdraw(owner.address);
console.log("withdraw the token"); 
await rewardToken.connect(owner).mint(owner.address,1000);
await staking1.connect(owner).withdraw(rewardToken.address );
await rewardToken.connect(owner).transfer(owner.address)
console.log("withdraw done");
 })



// it("should return straked",async()=>{

//  await stakeToken.connect(owner).mint(ow)





// })



})