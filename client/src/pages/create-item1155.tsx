import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { nftmarketaddress, erc1155address } from "../../config";
import NFTMarket from "../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import ERC1155NFT from "../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json";

export default function CreateItem() {
  const [loadingState, setLoadingState] = useState("loaded");
  const [formInput, updateFormInput] = useState({
    name: "",
    descriprion: "",
    price: "",
    amount: "",
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
    setLoadingState("not-loaded");
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

    let transaction = await contract.createToken(
      json.uri,
      Number(formInput.amount)
    );

    contract.on("tokenCreated", async (itemId) => {
      console.log("Event is working");
      const tokenId = itemId;

      await transaction.wait();

      const price = ethers.parseUnits(formInput.price, "ether");
      transaction = await contract.setApprovalForAll(nftmarketaddress, true);
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      transaction = await contract.listItem(
        erc1155address,
        tokenId,
        price,
        Number(formInput.amount)
      );
      await transaction.wait();

      setLoadingState("loaded");
      router.push("/");
    });
  };

  return (
    <div className="w-1/3 flex flex-col pb-12 pt-20">
      <h2 className="text-2xl font-bold">Create ERC721</h2>
        <input
          type="text"
          placeholder="Name"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-6 text-md outline-none border-gray-200"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-6 text-md outline-none border-gray-200"
          onChange={(e) =>
            updateFormInput({ ...formInput, descriprion: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Price"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-6 text-md outline-none border-gray-200"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Amount"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-6 text-md outline-none border-gray-200"
          onChange={(e) =>
            updateFormInput({ ...formInput, amount: e.target.value })
          }
        />

        <input type="file" name="Asset" className="my-4" onChange={onChange} />

        <button
          onClick={createItem}
          className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-4 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loadingState == "loaded" ? "Create NFT" : "Creating..."}
        </button>
      </div>
  );
}
