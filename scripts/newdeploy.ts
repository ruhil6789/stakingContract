import{ethers} from "hardhat";
async function main(){

const owner ="0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589";
const signer1 ="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
const signer2 ="0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

 const New = await ethers.getContractFactory("New");
 const n = await  New.deploy(); 
 //console.log(n);
 await n.deployed();
 console.log("transfer the value through different way");
  const a= await n.connect(owner).sendviatransfer(owner,{value:6});
  console.log(a);
  const b = await n.connect(signer1).sendviaSend(owner,signer1,{value:6},{value:7}); 

console.log(b);
const c =await n.connect(signer2).sendviacall(owner,signer1, signer2,{value:1},{value:2},{value:3});
console.log(c);

}
 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});