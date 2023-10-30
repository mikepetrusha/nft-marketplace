import { useMarket } from '@/hooks/useMarket';
import { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { useRouter } from 'next/router';
import { IItem } from '@/types/nft';
import { z } from 'zod';
import Form, { useZodForm } from './forms/Form';
import { Input } from './forms/Input';
import SubmitButton from './forms/SubmitButton';

const schema = z.object({
  price: z.coerce.number().min(0),
  amount: z.coerce.number().min(0),
});

interface sellDialogProps {
  nft: IItem;
}

export const SellDialog = ({ nft }: sellDialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { listNft } = useMarket();
  const form = useZodForm({ schema });
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

  const listNFT = async (nft: IItem, price: number, amount: number) => {
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
          <h2 className="text-2xl">Sell item</h2>

          <Form form={form} onSubmit={(data) => listNFT(nft, data.price, data.amount)}>
            <div className="space-y-5 p-4">
              <Input type="text" label="Price" required {...form.register('price')} />
              <Input type="number" label="Amount" required {...form.register('amount')} />

              <SubmitButton name="Sell" loadingState={loadingState} />
            </div>
          </Form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>Close</button>
        </form>
      </dialog>
    </div>
  );
};
