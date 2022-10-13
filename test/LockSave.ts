 import {ethers} from "hardhat";
 import {expect} from "chai";
 import {Contract} from "ethers";
 import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { LockSave, LockSave__factory } from "../typechain-types";



 describe("LockSave", async()=>{
  let lockSave:LockSave;
  let owner: SignerWithAddress;
let signers: SignerWithAddress[];
  
  beforeEach("contracts",async()=>{
   signers = await ethers.getSigners();
   owner = signers[0];
   const  LockSave =await ethers.getContractFactory("LockSave");
   lockSave = await LockSave.deploy();
   await  lockSave.deployed();

 });

describe("")







 })