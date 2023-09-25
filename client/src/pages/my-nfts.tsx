import { useEffect, useState } from "react";
import { IItem } from "@/types/nft";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useMarket } from "@/hooks/useMarket";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";

type FormValues = {
  card: {
    price: string;
    amount: string;
  }[];
};

export default function MyNFTs() {
  const [nfts, setNfts] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const {loadNft, listNft} = useMarket();
  const {register, handleSubmit, control} = useForm<FormValues>();
  const {} = useFieldArray<FormValues>({
    control,
    name: 'card'
  })

  useEffect(() => {
    const loadNfts = async () => {
      setLoadingState("not-loaded");
      try {
        const items = await loadNft()
        setNfts(items);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingState("loaded");
      }
    };
    loadNfts();
  }, []);


  const listNFT = async (nft: any, price: string, amount: string) => {
    setLoadingState("not-loaded");
    try {
      await listNft(nft, price, amount)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingState("loaded");
    }
    router.push("/");
  };

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;

  return (
      <div className="px-4 max-w-7xl" >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, index) => (
            <div
              className="border overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-slate-900/5"
              key={index}
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
                  <TextField>Description: {nft.description}</TextField>
                  <TextField>Token Type: {nft.tokenType === 0 ? "ERC1155" : "ERC721"}</TextField>
                  <TextField>Amount: {nft.amount}</TextField>
              </div>
              <form onSubmit={handleSubmit((data) => listNFT(nft, data.card[index].price, data.card[index].amount))} className="p-4 bg-black">
                <input
                  type="text"
                  placeholder="Price"
                  className="border rounded py-2 px-4"
                  {...register(`card.${index}.price`)}
                />

                  <input
                    type="text"
                    placeholder="Amount"
                    className="mt-3 border rounded py-2 px-4"
                    {...register(`card.${index}.amount`)}
                  />

                <Button loadingState={loadingState} name='Sell'/>
              </form>
            </div>
          ))}
        </div>
      </div>
  );
}