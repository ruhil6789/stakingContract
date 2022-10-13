import {ethers} from "hardhat";

async function main(){

const owner = "0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589";

let no1 = 15;
 const no2 =10;
 const Calculate = await ethers.getContractFactory("Calculate");
 const cal =  await Calculate.deploy(no1, no2);
 await cal.deployed();
 console.log('operation of no1 and no2');
const x = await cal.connect(owner).sum(no1, 5);
console.log(x);
const y = await cal.connect(owner).sub(no1,no2);
console.log(y);
const z = await cal.connect(owner).mul(no1,no2);
console.log(z);
}

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
