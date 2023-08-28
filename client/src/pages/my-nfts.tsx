import { nftmarketaddress, erc1155address, erc721address } from "../../config";
import NFTMarket from "../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ERC721NFT from "../../../server/artifacts/contracts/ERC721.sol/ERC721NFT.json";
import ERC1155NFT from "../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { IItem } from "@/types/nft";
import axios from "axios";
import { ipfsToHTTPS } from "@/helpers/ipfsToHTTPS";

export default function MyNFTs() {
  const [nfts, setNfts] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
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
    const data = await marketContract.fetchMyItems();

    const items: IItem[] = await Promise.all(
      data.map(async (i: any) => {
        let tokenUri;

        if (Number(i.tokenType) === 1) {
          tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
        } else {
          tokenUri = await tokenContractERC1155.uri(i.tokenId);
        }
        // const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(ipfsToHTTPS(tokenUri));
        let price = ethers.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          image: ipfsToHTTPS(meta.data.image),
        };
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  };

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;

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
                  ID: {nft.tokenId}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">Owner: {nft.owner}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-sm mb-4 font-bold text-white">
                  Seller: {nft.seller}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
