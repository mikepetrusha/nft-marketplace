import { useEffect, useState } from 'react';
import { IItem } from '@/types/nft';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMarket } from '@/hooks/useMarket';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';

export default function Home() {
  const [nfts, setNFTs] = useState<IItem[]>([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const router = useRouter();
  const { loadMarketNfts, BuyNft } = useMarket();

  useEffect(() => {
    const loadNFTs = async () => {
      setLoadingState('not-loaded');
      try {
        const items = await loadMarketNfts();
        setNFTs(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingState('loaded');
      }
    };
    loadNFTs();
  }, []);

  async function buyNft(nft: IItem) {
    setLoadingState('not-loaded');
    try {
      await BuyNft(nft);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState('loaded');
    }
    router.push('/my-nfts');
  }

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {nfts.map((nft, i) => (
          <div className="overflow-hidden rounded-xl border border-gray-500 shadow" key={i}>
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
            <div className="bg-black p-4">
              <p className="mb-4 text-2xl font-bold text-white">{nft.price} ETH</p>
              <Button onClick={() => buyNft(nft)} loadingState={loadingState} name="Buy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
