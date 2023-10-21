import { useSigner } from '@/hooks/useSigner';
import { AddressAvatar } from './AddressAvatar';

export const ConnectButton = () => {
  const { address, loading, connectWallet } = useSigner();

  if (address) return <AddressAvatar address={address} />;
  return (
    <button
      className="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Connect wallet'}
    </button>
  );
};
