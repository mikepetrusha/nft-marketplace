import { nftmarketaddress, erc1155address, erc721address } from "../../config";
import NFTMarket from "../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ERC721NFT from "../../../server/artifacts/contracts/ERC721.sol/ERC721NFT.json";
import ERC1155NFT from "../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { IItem } from "@/types/nft";
import { ipfsToHTTPS } from "@/helpers/ipfsToHTTPS";

export default function Home() {
  const [nfts, setNFTs] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.JsonRpcProvider();
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
        console.log(Number(i.tokenType));
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
        };

        return item;
      })
    );

    setNFTs(items);
    setLoadingState("loaded");
  };

  async function buyNft(nft: any) {
    console.log(nft);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );

    const transaction = await contract.buyItem(nft.itemId, {
      value: ethers.parseEther(nft.price),
    });

    contract.on(
      "MarketItemCreated",
      (itemId, nftContract, tokenId, seller, owner, price, sold) => {
        console.log(
          `MarketItemCreated is emitted. itemId: ${itemId}, nftContract: ${nftContract}, tokenId: ${tokenId}, seller: ${seller}, owner: ${owner}, price: ${price}, sold: ${sold}`
        );
      }
    );

    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div className="border shadow rounded-xl overflow-hidden" key={i}>
              <img
                className="h-80 w-full object-cover object-center"
                src={nft.image}
                alt="image"
              />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p className="text-gray-400">
                    Token Type: {nft.tokenType === 0 ? "ERC1155" : "ERC721"}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
