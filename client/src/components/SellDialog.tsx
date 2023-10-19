import { useMarket } from "@/hooks/useMarket";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { Input } from "./Input";

type FormValues = {
  price: string;
  amount: string;
};

interface sellDialogProps {
  nft: any;
  index: number;
}

export const SellDialog = ({ nft, index }: sellDialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { listNft } = useMarket();
  const { register, handleSubmit } = useForm<FormValues>();
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const listNFT = async (nft: any, price: string, amount: string) => {
    console.log("NFT to sell: ", nft);
    setLoadingState("not-loaded");
    try {
      await listNft(nft, price, amount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState("loaded");
    }
    router.push("/");
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Open Modal
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit((data) =>
              listNFT(nft, data.price, data.amount)
            )}
            className=""
          >
            {/* <input
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
            /> */}

            <Input
              type="text"
              placeholder="Price"
              register={register}
              name="price"
            />

            <Input
              type="text"
              placeholder="Amount"
              register={register}
              name="amount"
            />

            <Button loadingState={loadingState} name="Sell" />
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>Close</button>
        </form>
      </dialog>
    </div>
  );
};
