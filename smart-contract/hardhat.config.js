require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // Match the version of Solidity you're using in your contract
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC, // RPC URL from Infura or Alchemy
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};
