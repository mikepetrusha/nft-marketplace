import { JsonRpcSigner, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type SignerContextType = {
  signer?: JsonRpcSigner;
  address?: string;
  loading: boolean;
  connectWallet: () => Promise<void>;
};

const SignerContext = createContext<SignerContextType>({} as any);

export const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const web3Modal = new Web3Modal();
    if (web3Modal.cachedProvider) connectWallet();
    window.ethereum.on('accountChanged', connectWallet);
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const web3Modal = new Web3Modal({ cacheProvider: true });
      const intrance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(intrance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const network = await provider.getNetwork();
      if (network.name !== 'sepolia') {
        alert('Please switch to the Sepolia network.');
        throw new Error('Please switch to the Sepolia network.');
      }

      setSigner(signer);
      setAddress(address);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = { signer, address, loading, connectWallet };

  return <SignerContext.Provider value={contextValue}>{children}</SignerContext.Provider>;
};
