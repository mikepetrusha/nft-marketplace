import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { IFormInput } from "@/types/nft";
import { useMarket } from "@/hooks/useMarket";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function CreateItem() {
  const [loadingState, setLoadingState] = useState("loaded");
  const {register, handleSubmit} = useForm<IFormInput>();
  const router = useRouter();
  const {create721} = useMarket()

  const createSale = async (data: IFormInput) => {
    setLoadingState("not-loaded");
      try {
        await create721(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingState("loaded");
      }
      router.push("/my-nfts");
  };

  return (
      <div className="w-1/3 flex flex-col pb-12 pt-20">
        <h2 className="text-2xl font-bold">Create ERC721</h2>
        <form onSubmit={handleSubmit(createSale)}>
          <Input type="text" placeholder="Name" register={register} name='name'/>
          <Input type="text" placeholder="Description" register={register} name='description'/>
          <Input type="text" placeholder="Price" register={register} name='price'/>
          <input type="file" className="my-4" {...register('image')} />

          <Button loadingState={loadingState} name='Create NFT'/>
        </form>
      </div>
  );
}
