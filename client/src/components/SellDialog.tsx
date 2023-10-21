import { useMarket } from '@/hooks/useMarket';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { useRouter } from 'next/router';
import { Input } from './Input';

type FormValues = {
  price: string;
  amount: string;
};

interface sellDialogProps {
  nft: any;
}

export const SellDialog = ({ nft }: sellDialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { listNft } = useMarket();
  const { register, handleSubmit } = useForm<FormValues>();
  const [loadingState, setLoadingState] = useState('loaded');
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
    setLoadingState('not-loaded');
    try {
      await listNft(nft, price, amount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState('loaded');
    }
    router.push('/');
  };

  return (
    <div>
      <Button name="Sell Item" loadingState="loaded" className="btn" onClick={openModal} />

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit((data) => listNFT(nft, data.price, data.amount))}
            className=""
          >
            <h2 className="text-2xl">Sell item</h2>
            <Input type="text" placeholder="Price" register={register} name="price" />
            <Input type="text" placeholder="Amount" register={register} name="amount" />

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
