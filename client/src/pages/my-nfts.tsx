import { useEffect, useState } from 'react';
import { IItem } from '@/types/nft';
import Image from 'next/image';
import { useMarket } from '@/hooks/useMarket';
import { TextField } from '@/components/ui/TextField';
import { SellDialog } from '@/components/SellDialog';

export default function MyNFTs() {
  const [nfts, setNfts] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const { loadNft } = useMarket();

  useEffect(() => {
    const loadNfts = async () => {
      setLoadingState('not-loaded');
      try {
        const items = await loadNft();
        setNfts(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingState('loaded');
      }
    };
    loadNfts();
  }, []);

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No assets owned</h1>;

  return (
    <div className="max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {nfts.map((nft, index) => (
          <div className="overflow-hidden rounded-xl border border-gray-500 shadow" key={index}>
            <Image
              className="h-80 w-full object-cover object-center"
              src={nft.image}
              width={500}
              height={500}
              alt="image"
            />
            <div className="p-4">
              <p className="overflow-hidden overflow-ellipsis text-2xl font-semibold">{nft.name}</p>
              <TextField>Description: {nft.description}</TextField>
              <TextField>Token Type: {nft.tokenType === 0 ? 'ERC1155' : 'ERC721'}</TextField>
              <TextField>Amount: {nft.amount}</TextField>
            </div>

            <SellDialog nft={nft} />
          </div>
        ))}
      </div>
    </div>
  );
}
