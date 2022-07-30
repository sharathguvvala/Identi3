
const hre = require("hardhat");

async function main() {

  const contract = await hre.ethers.getContractFactory("Identi3");
  const deployedContract = await contract.deploy();

  await deployedContract.deployed();

  console.log("Smart Contract deployed to:", deployedContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});