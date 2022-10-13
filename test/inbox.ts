import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("message", function(){


async function messagefixture() {
    
// const msg ="hi there";
   // const [owner, otherAccount] = await ethers.getSigners();

   const Message= await ethers.getContractFactory("Message");
   const message = await Message.deploy("lol");
    return {message};
}
 describe("Deployment", function (){
    it("should set the first message",async function(){
      const{ message} =  await loadFixture(messagefixture);
      console.log(message);
      
        //  expect(await message.message()).to.equal(msg);

    });

 });
describe("setMessage", function(){
  it("should set the initial message", async function(){

     const{message} =await loadFixture(messagefixture);
      //await expect(message.setMessage()).to.be.revertedWith("value of the message cannot be set");
    //  await expect(message.setmessage(msg)).to.equal(msg);
    });


   it("should the value of  message in not set", async function (){
     const{message} = await loadFixture(messagefixture);
    //  await expect(message.deploy(msg)).to.be.revertedWith("message is not set");

   });
  it("should set new message", async function(){
   const { message} = await loadFixture(messagefixture);
//    await expect(message.setmessage(msg)).to.equal(msg);
  });

 it("should return the message", async function(){
 const {message} = await loadFixture(messagefixture);
//   await expect(message.getmessage()).to.equal(msg); 

      });
 
   });
}); 