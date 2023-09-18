import { nftmarketaddress, erc1155address, erc721address } from "../../config";
import NFTMarket from "../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ERC721NFT from "../../../server/artifacts/contracts/ERC721.sol/ERC721NFT.json";
import ERC1155NFT from "../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { IItem } from "@/types/nft";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useMarket } from "@/hooks/useMarket";

export default function MyNFTs() {
  const [formInput, updateFormInput] = useState({
    price: "",
    amount: "",
  });
  const [nfts, setNfts] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const {loadNft} = useMarket()

  useEffect(() => {
    loadNfts();
  }, []);

  const listNFT = async (nft: any) => {
    setLoadingState("not-loaded");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const tokenId = nft.tokenId;

    let contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

    if (Number(nft.tokenType) === 1) {
      let contract = new ethers.Contract(erc721address, ERC721NFT.abi, signer);
      let transaction = await contract.approve(nftmarketaddress, tokenId);
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      console.log(
        nft,
        ethers.parseUnits(formInput.price, "ether"),
        formInput.amount
      );

      transaction = await contract.updateListing(
        nft.itemId,
        ethers.parseUnits(formInput.price, "ether"),
        1
      );
      await transaction.wait();
    } else {
      let contract = new ethers.Contract(
        erc1155address,
        ERC1155NFT.abi,
        signer
      );
      let transaction = await contract.setApprovalForAll(
        nftmarketaddress,
        true
      );
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      transaction = await contract.listItem(
        erc1155address,
        tokenId,
        ethers.parseUnits(formInput.price, "ether"),
        formInput.amount
      );
      await transaction.wait();
    }

    setLoadingState("loaded");
    router.push("/");
  };

  const loadNfts = async () => {
    try {
      const items = await loadNft()
      setNfts(items);
    } catch (error) {
      console.log(error)
    }
    setLoadingState("loaded");
  };

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;

  return (
      <div className="px-4 max-w-7xl" >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div
              className="border overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-slate-900/5"
              key={i}
            >
              <Image
                className="h-80 w-full object-cover object-center"
                src={nft.image}
                width={500}
                height={500}
                alt="image"
              />
              <div className="p-4">
                <p className="text-2xl font-semibold overflow-hidden overflow-ellipsis">
                  {nft.name}
                </p>
                  <p className="text-gray-400 overflow-hidden overflow-ellipsis">Description: {nft.description}</p>
                  <p className="text-gray-400 overflow-hidden overflow-ellipsis">
                    Token Type: {nft.tokenType === 0 ? "ERC1155" : "ERC721"}
                  </p>
                  <p className="text-gray-400 overflow-hidden overflow-ellipsis">Amount: {nft.amount}</p>
                  <p className="text-gray-400 overflow-hidden overflow-ellipsis">
                    Owner:{" "}
                    {nft.owner.slice(nft.owner.length - 4, nft.owner.length)}
                  </p>
              </div>
              <div className="p-4 bg-black">
                <input
                  type="text"
                  placeholder="Price"
                  className="border rounded py-2 px-4"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, price: e.target.value })
                  }
                />

                  <input
                    disabled={Number(nft.tokenType) === 0 ? false : true}
                    type="text"
                    placeholder={Number(nft.tokenType) === 0 ? 'Amount' : '1'}
                    className="mt-3 border rounded py-2 px-4"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, amount: e.target.value })
                    }
                  />

                <button
                  className="mt-3 w-full bg-pink-500 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring focus:ring-purple-300 active:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => listNFT(nft)}
                >
                  {loadingState == "loaded" ? "Sell" : "Loading..."}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}