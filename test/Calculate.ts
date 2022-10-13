import{loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";


describe("Calculate",function(){

 async  function calfixture() {

 let no1 = 15;
 const no2 =10;
 const Calculate = await ethers.getContractFactory("Calculate");
 const cal =  await Calculate.deploy(no1, no2);
 return{cal, no1, no2};
 }

 describe("Deployment",function(){
    it("should add the value", async function (){
     const{cal,no1,no2} = await loadFixture(calfixture);
     console.log(no1);
     console.log(no2);
     const e = await cal.sum(no1, no2);
     console.log(e);
     
     await expect(await cal.sum(no1, no2)).to.equal(no1+no2);   
     console.log("no 1",no1,"\n no 2: ",no2,"\n sum : ",no1+no2);
     
    });

    it("should  revert  the no", async function(){
     const {cal, no1, no2} = await loadFixture(calfixture);
  expect( await cal.sum(no1, no2)).to.be.revertedWith("return the  sum");

    });
});

describe("sub ", function(){
it("should subtract the  number", async function(){
 const {cal, no1, no2} = await loadFixture(calfixture);
 console.log(no1);
 console.log(no2);
  let s= await cal.sub(no1, no2);
//   console.log(s);
    expect(await cal.sub(no1, no2)).to.equal(no1-no2);
  console.log("no1",no1,"\n no2", no2,"\sub",no1-no2);
 });

it("should  revert when  a is smaller",async function (){
  let { cal, no1, no2} = await loadFixture(calfixture);
  expect(cal.sub(0, no2)).to.be.revertedWith("a is smaller");

});
});

describe("mul ", function(){
    it("should mul the  number", async function(){
     const {cal, no1, no2} = await loadFixture(calfixture);
     console.log(no1);
     console.log(no2);
      const m= cal.mul(no1, no2);
      console.log(m);
      await expect(await cal.mul(no1, no2)).to.equal(no1*no2);
      console.log("no1",no1,"\n no2", no2, "\sub",no1*no2);
     });
    
    it("should  revert when  a is zero",async function (){
      const { cal, no1, no2} = await loadFixture(calfixture);
       expect(await cal.mul(0, no2)).to.be.revertedWith(" a  is zero ");
    
    });
    });
    
describe("div ", function(){
    it("should div the  number", async function(){
     const {cal, no1, no2} = await loadFixture(calfixture);
     console.log(no1);
     console.log(no2);
      const d= await cal.div(no1,no2);
      console.log(d);
        expect(await cal.div(no1, no2)).to.equal(1);
      console.log("no1",no1,"\n no2", no2, "\sub",no1/no2);
     });
    
    it("should  revert when  a is zero",async function (){
      const { cal, no1, no2} = await loadFixture(calfixture);
       expect(await cal.div(0,no2)).to.be.revertedWith("cannot div due to a is zero ");
    
    });
    });

 });
