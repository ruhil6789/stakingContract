import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

 describe("New", function(){

 async function deployFixture(){
 let owner;
 let signer1;
 let signer2;
 owner = await ethers.getSigners();
 signer1 = await ethers.getSigners();
 signer2 = await ethers.getSigners();
 const New = await ethers.getContractFactory("New");
 const n = await New.deploy();

 return{ owner,signer1,signer2,n};
 }
describe("deployment",function(){
it("should  transfer the ether",async function(){
 const {owner,n} =await loadFixture(deployFixture);
 const x = n.sendviatransfer(owner,{value:6});

});
it("should  transfer the ether through send", async function(){
 const {owner, signer1,n} = await loadFixture(deployFixture);
const s= n.sendviaSend(owner,signer1,{value:6},{value:7});


});

it("should send the ether through",async function(){

 const {owner, signer1, signer2,n} =await loadFixture(deployFixture);
 const f= n.sendviacall(owner, signer1, signer2,{value:2},{value:9},{value:10});

});

});
 });

