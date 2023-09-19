import { useEffect, useState } from "react";
import { IItem } from "@/types/nft";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useMarket } from "@/hooks/useMarket";

export default function Home() {
  const [nfts, setNFTs] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const {loadMarketNfts, BuyNft} = useMarket();

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setLoadingState("not-loaded");
    try {
      const items = await loadMarketNfts()
      setNFTs(items);
    } catch (error) {
      console.log(error)
    }
    setLoadingState("loaded");
  };

  async function buyNft(nft: any) {
    setLoadingState("not-loaded");
    await BuyNft(nft)
    loadNFTs();
    setLoadingState("loaded");
    router.push("/my-nfts");
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
      <div className="px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div className="border shadow rounded-xl overflow-hidden" key={i}>
              <Image
                className="h-80 w-full object-cover object-center"
                src={nft.image}
                width={500}
                height={500}
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
                  <p className="text-gray-400">
                    Description: {nft.description}
                  </p>
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
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="mt-3 w-full bg-pink-500 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring focus:ring-purple-300 active:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => buyNft(nft)}
                >
                  {loadingState == "loaded" ? "Buy" : "Loading..."}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
