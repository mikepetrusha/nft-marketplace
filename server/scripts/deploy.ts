import { ethers } from "hardhat";

async function main() {
  // const NFTMarket = await ethers.deployContract("NFTMarket");

  // await NFTMarket.waitForDeployment();
  // const NFTMarketAddress = NFTMarket.getAddress();
  // console.log("NFTMarket deployed to: ", NFTMarketAddress);

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const market = await NFTMarket.deploy();
  await market.waitForDeployment();
  console.log("NFTMarket deployed to: ", market.target);

  const Contract721 = await ethers.getContractFactory("ERC721NFT");
  const contract721 = await Contract721.deploy();
  await contract721.waitForDeployment();
  console.log("ContractERC721 deployed to: ", contract721.target);

  const Contract1155 = await ethers.getContractFactory("ERC1155NFT");
  const contract1155 = await Contract1155.deploy();
  await contract1155.waitForDeployment();
  console.log("ContractERC1155 deployed to: ", contract1155.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
