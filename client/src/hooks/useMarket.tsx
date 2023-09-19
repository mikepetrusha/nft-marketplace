import { ethers } from "ethers";
import { useSigner } from "./useSigner"
import { erc1155address, erc721address, nftmarketaddress } from "../../config";
import NFTMarket from '../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import ERC721NFT from '../../../server/artifacts/contracts/ERC721.sol/ERC721NFT.json'
import ERC1155NFT from '../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json'
import { IItem } from "@/types/nft";
import axios from "axios";
import { ipfsToHTTPS } from "@/helpers/ipfsToHTTPS";

export const useMarket = () => {
    const {signer} = useSigner()
    const marketContract = new ethers.Contract(
        nftmarketaddress,
        NFTMarket.abi,
        signer
      );

    const tokenContractERC721 = new ethers.Contract(
        erc721address,
        ERC721NFT.abi,
        signer
      );
  
    const tokenContractERC1155 = new ethers.Contract(
        erc1155address,
        ERC1155NFT.abi,
        signer
      );

    const loadNft = async() => {
          const data = await marketContract.fetchMyItems();
      
          const items: IItem[] = await Promise.all(
            data.map(async (i: any) => {
              let tokenUri;
              let amount;
              let owner;
      
              if (Number(i.tokenType) === 1) {
                tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
                owner = await tokenContractERC721.ownerOf(i.tokenId);
                console.log(owner);
                amount = 1;
              } else {
                tokenUri = await tokenContractERC1155.uri(i.tokenId);
                amount = await tokenContractERC1155.balanceOf(
                  i.owner,
                  Number(i.tokenId)
                );
              }
              const meta = await axios.get(ipfsToHTTPS(tokenUri));
              let item = {
                itemId: i.itemId,
                tokenId: Number(i.tokenId),
                owner: i.owner,
                image: ipfsToHTTPS(meta.data.image),
                name: meta.data.name,
                description: meta.data.description,
                tokenType: Number(i.tokenType),
                amount: Number(amount),
              };
              return item;
            })
          );

          return items.filter((item) => item.amount > 0)
    }


    const loadMarketNfts = async() => {
        const provider = new ethers.JsonRpcProvider(
            "https://sepolia.infura.io/v3/9eac74003e914d29abec44e635b26fb4"
          );
          const tokenContractERC721 = new ethers.Contract(
            erc721address,
            ERC721NFT.abi,
            provider
          );
      
          const tokenContractERC1155 = new ethers.Contract(
            erc1155address,
            ERC1155NFT.abi,
            provider
          );
          const marketContract = new ethers.Contract(
            nftmarketaddress,
            NFTMarket.abi,
            provider
          );
          const data = await marketContract.fetchMarketItems();
      
          const items: IItem[] = await Promise.all(
            data.map(async (i: any) => {
              let tokenUri;
      
              if (Number(i.tokenType) === 1) {
                tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
              } else {
                tokenUri = await tokenContractERC1155.uri(i.tokenId);
              }
      
              const meta = await axios.get(ipfsToHTTPS(tokenUri));
              let price = ethers.formatUnits(i.price.toString(), "ether");
      
              let item = {
                price,
                itemId: Number(i.itemId),
                tokenId: Number(i.tokenId),
                seller: i.seller,
                owner: i.owner,
                image: ipfsToHTTPS(meta.data.image),
                name: meta.data.name,
                description: meta.data.description,
                tokenType: Number(i.tokenType),
                amount: Number(i.amount),
              };
      
              return item;
            })
          );

          return items.filter((item) => item.amount > 0)
    }

    const BuyNft = async(nft: any) => {

        const transaction = await marketContract.buyItem(nft.itemId, nft.amount, {
            value: ethers.parseEther(nft.price),
        });

        await transaction.wait();
    }

    return {loadNft, loadMarketNfts, BuyNft}
}