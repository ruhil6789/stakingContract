import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

 describe ("Counters", function(){

  async function  CountersFixture(){
   let count;
    const Counters = await ethers.getContractFactory("Counters");
  const countt = await Counters.deploy(count);
  return {countt,count};
     
  }

describe("deployment",function(){

it("shound inc the value", async function () {
    const{ countt,count} = await loadFixture(CountersFixture);
     expect(await countt.inc()).to.equal(count);

});
it("shounld set the dec",async function(){
 const{count,countt} = await loadFixture(CountersFixture);
 expect(await countt.dec()).to.equal(count);

});
it("should get the count",async function(){

 const {count,countt} = await loadFixture(CountersFixture);
 expect(await countt.get()).to.equal(count);


});
});
});