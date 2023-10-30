import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMarket } from '@/hooks/useMarket';
import { z } from 'zod';
import Form, { useZodForm } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import SubmitButton from '@/components/forms/SubmitButton';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number().min(0),
  image: z.unknown(),
});

export default function CreateItem() {
  const [loadingState, setLoadingState] = useState('loaded');
  const router = useRouter();
  const { create1155 } = useMarket();
  const form = useZodForm({ schema });

  const createSale = async (data: any) => {
    setLoadingState('not-loaded');
    try {
      await create1155(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState('loaded');
    }
    router.push('/my-nfts');
  };

  return (
    <div className="flex w-1/3 flex-col pb-12 pt-20">
      <h2 className="text-2xl font-bold">Create ERC1155</h2>
      <Form form={form} onSubmit={createSale}>
        <div className="space-y-5 p-4">
          <Input type="text" label="Name" required {...form.register('name')} />
          <Input type="text" label="Description" required {...form.register('description')} />
          <Input type="number" label="Amount" required {...form.register('amount')} />
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary my-4 w-full"
            required
            {...form.register('image')}
          />

          <SubmitButton name="Submit" loadingState={loadingState} />
        </div>
      </Form>
    </div>
  );
}
