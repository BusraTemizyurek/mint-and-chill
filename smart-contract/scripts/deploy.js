const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory
  const MintAndChillNFT = await hre.ethers.getContractFactory(
    "MintAndChillNFT"
  );

  // Deploy the contract with the constructor parameters (name, symbol, owner)
  const mintAndChillNFT = await MintAndChillNFT.deploy(
    "MintAndChillNFT",
    "MACNFT",
    deployer.address
  );

  console.log("Contract deployed at:", mintAndChillNFT.address);

  // Wait for the contract to be mined
  await mintAndChillNFT.deployed();
  console.log("Contract successfully deployed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
