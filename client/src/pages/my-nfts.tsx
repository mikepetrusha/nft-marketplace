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
import { useRouter } from "next/router";

export default function MyNFTs() {
  const [formInput, updateFormInput] = useState({
    price: "",
    amount: "",
  });
  const [nfts, setNfts] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();

  useEffect(() => {
    loadNfts();
  }, []);

  const listNFT = async (nft: any) => {
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

      transaction = await contract.listItem(
        erc721address,
        tokenId,
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

      contract.on(
        "MarketItemCreated",
        (
          itemId,
          assetContract,
          tokenId,
          seller,
          owner,
          price,
          sold,
          tokenType,
          amount
        ) => {
          console.log(
            itemId,
            assetContract,
            tokenId,
            seller,
            owner,
            price,
            sold,
            tokenType,
            amount
          );
        }
      );

      transaction = await contract.listItem(
        erc1155address,
        tokenId,
        ethers.parseUnits(formInput.price, "ether"),
        formInput.amount
      );
      await transaction.wait();
    }

    router.push("/");

    console.log("Loading... ");
  };

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
        let amount;

        if (Number(i.tokenType) === 1) {
          tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
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

    setNfts(items.filter((item) => item.amount > 0));
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
                <div style={{ overflow: "hidden" }}>
                  <p className="text-gray-400">Amount: {nft.amount}</p>
                </div>
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

                {Number(nft.tokenType) === 0 && (
                  <input
                    type="text"
                    placeholder="Amount"
                    className="mt-3 border rounded py-2 px-4"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, amount: e.target.value })
                    }
                  />
                )}

                <button
                  className="mt-3 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => listNFT(nft)}
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
