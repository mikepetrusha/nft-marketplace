import { useEffect, useState } from "react";
import { IItem } from "@/types/nft";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMarket } from "@/hooks/useMarket";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";

export default function Home() {
  const [nfts, setNFTs] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const { loadMarketNfts, BuyNft } = useMarket();

  useEffect(() => {
    const loadNFTs = async () => {
      setLoadingState("not-loaded");
      try {
        const items = await loadMarketNfts();
        setNFTs(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingState("loaded");
      }
    };
    loadNFTs();
  }, []);

  async function buyNft(nft: any) {
    setLoadingState("not-loaded");
    try {
      await BuyNft(nft);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState("loaded");
    }
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
              <p className="text-2xl font-semibold overflow-hidden overflow-ellipsis">
                {nft.name}
              </p>
              <TextField>Description: {nft.description}</TextField>
              <TextField>
                Token Type: {nft.tokenType === 0 ? "ERC1155" : "ERC721"}
              </TextField>
              <TextField>Amount: {nft.amount}</TextField>
              <TextField>
                ImageURL: {nft.image.slice(100, nft.image.length)}
              </TextField>
            </div>
            <div className="p-4 bg-black">
              <p className="text-2xl mb-4 font-bold text-white">
                {nft.price} ETH
              </p>
              <Button
                onClick={() => buyNft(nft)}
                loadingState={loadingState}
                name="Buy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
