
import {ethers} from "hardhat";
import { Stake__factory, Stakee, Stake, Stakee__factory} from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expandTo18Decimals, mineBlocks } from "./utilities/utilities";

describe("Staking", async()=>{
 let stakee: Stakee;
 let stake:Stake;
 let owner: SignerWithAddress;
 let signers :SignerWithAddress[];
 
 beforeEach("contracts",async()=>{
  signers =await ethers.getSigners();
  owner = signers[0];
  stake = await new Stake__factory(owner).deploy("STK","ST");
  stakee = await new Stakee__factory(owner).deploy(stake.address);
 })
 
it("should mint the token", async() =>{

console.log("initial balance",await stake.balanceOf(signers[1].address));
await stake.connect(owner).mint(signers[1].address,1000);
console.log("balance",await stake.balanceOf(signers[1].address));
})

it("should stake the token", async()=>{
console.log("stake the token");

await stake.connect(signers[1]).mint(signers[1].address, 1000);
await stake.connect(signers[1]).approve(stakee.address,1000);
await mineBlocks(ethers.provider,100);
console.log("staking balance", await stakee.connect(signers[1]).stake(100));
console.log("should stake the amount");
await stake.connect(signers[2]).mint(signers[2].address,1000);
await stake.connect(signers[2]).approve(stakee.address,800);
await stakee.connect(signers[2]).stake(300);
await mineBlocks(ethers.provider,100);



await stake.connect(signers[3]).mint(signers[3].address,1000);
await stake.connect(signers[3]).approve(stakee.address,900);
await stakee.connect(signers[3]).stake(50);
await mineBlocks(ethers.provider,100);



await stake.connect(signers[4]).mint(signers[4].address,1000);
await stake.connect(signers[4]).approve(stakee.address,600);
await stakee.connect(signers[4]).stake(500);
await mineBlocks(ethers.provider,100);



await stake.connect(signers[5]).mint(signers[5].address,1000);
await stake.connect(signers[5]).approve(stakee.address,1000);
await stakee.connect(signers[5]).stake(190);

})
it("should get the random number",async()=>{
 console.log("should get the random number");
 await stakee.connect(owner).getrandomNumber(6);


})


it.only("should withdraw the token", async()=>{
 console.log("should withdraw the  token ");
 await stake.mint(stakee.address,expandTo18Decimals(100));
 await stake.connect(signers[1]).mint(signers[1].address,1000);
 await stake.connect(signers[1]).approve(stakee.address,1000);
 await stakee.connect(signers[1]).getrandomNumber(6);
 await stakee.connect(signers[1]).stake(100);
 console.log("number", await stakee.random());
 await stakee.connect(signers[1]).withdraw();
 console.log("balance of",await stake.balanceOf(signers[1].address));




 await mineBlocks(ethers.provider,100);
 await stake.connect(signers[2]).mint(signers[2].address,1000);
 await stake.connect(signers[2]).approve(stakee.address,1000);
//  await stakee.connect(signers[2]).getrandomNumber(5);
 await stakee.connect(signers[2]).stake(100);
 await stakee.connect(signers[2]).withdraw();
 await mineBlocks(ethers.provider,100);
 console.log("balance of",await stake.connect(signers[2]).balanceOf(signers[2].address));
//  expect(await stakee.connect(signers[2])).to.be.equal();



 await stake.connect(signers[3]).mint(signers[3].address,1000);
 await stake.connect(signers[3]).approve(stakee.address,1000);
//  await stakee.connect(signers[3]).getrandomNumber(2);
 await stakee.connect(signers[3]).stake(100);
 await stakee.connect(signers[3]).withdraw();
 console.log("balance of",await stake.balanceOf(signers[3].address));

 await mineBlocks(ethers.provider,100);


 await stake.connect(signers[4]).mint(signers[4].address,1000);
 await stake.connect(signers[4]).approve(stakee.address,1000);
 await stakee.connect(signers[4]).stake(100);

 await stakee.connect(signers[4]).withdraw();
 console.log("balance of",await stake.balanceOf(signers[4].address));

 await mineBlocks(ethers.provider,100);
 


 await stake.connect(signers[5]).mint(signers[5].address,1000);
 await stake.connect(signers[5]).approve(stakee.address,1000);
 await stakee.connect(signers[5]).stake(100);
 await stakee.connect(signers[5]).withdraw();
 console.log("balance of",await stake.balanceOf(signers[5].address));


//  await mineBlocks(ethers.provider,100);
 
 


//  await stake.connect(owner).mint(owner.address,1000);
//  await stake.connect(owner).approve(stakee.address,1000);
//  await stakee.connect(owner).stake(100);
//  await stakee.connect(owner).withdraw();



})
})