import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { nftmarketaddress, erc1155address } from "../../config";
import NFTMarket from "../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ERC1155NFT from "../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json";

export default function CreateItem() {
  const [formInput, updateFormInput] = useState({
    name: "",
    descriprion: "",
    price: "",
  });

  const router = useRouter();

  const data = new FormData();

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    data.append("image", file);
  };

  const createItem = async () => {
    const { name, descriprion, price } = formInput;

    if (!name || !descriprion || !price) return;
    data.append("name", name);
    data.append("description", descriprion);

    try {
      createSale();
    } catch (error) {
      console.log(error);
    }
  };

  const createSale = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const responce = await fetch("/api/nft-storage", {
      method: "POST",
      body: data,
    });

    if (responce.status !== 201) console.log("!Error in fetch nft-storage");

    const json = await responce.json();

    let contract = new ethers.Contract(erc1155address, ERC1155NFT.abi, signer);

    let transaction = await contract.createToken(json.uri);

    contract.on("tokenCreated", async (itemId) => {
      console.log("Event is working");
      const tokenId = itemId;

      await transaction.wait();

      const price = ethers.parseUnits(formInput.price, "ether");
      transaction = await contract.approveForMarketplace(tokenId);
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      transaction = await contract.listItem(erc1155address, tokenId, price);
      await transaction.wait();

      router.push("/");
    });

    console.log("Loading... ");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          type="text"
          placeholder="Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, descriprion: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Price"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        <input type="file" name="Asset" className="my-4" onChange={onChange} />

        <button
          onClick={createItem}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
