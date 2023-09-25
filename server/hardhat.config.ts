import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/9eac74003e914d29abec44e635b26fb4",
      accounts: [
        "0bea7164a83231263bb48c4918ea9f7dcd3123fc465574848ece0b5129a0d32f",
      ],
    },
  },
  solidity: "0.8.19",
};

export default config;
