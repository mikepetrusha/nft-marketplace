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
        "6eb252f13a92f50a03f8f4adcbad6d3413cff1012ca3d1313f4233b3dc8dbf8c",
      ],
    },
  },
  solidity: "0.8.19",
};

export default config;
