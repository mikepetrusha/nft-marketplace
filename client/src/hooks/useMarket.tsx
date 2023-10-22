import { ethers } from 'ethers';
import { useSigner } from './useSigner';
import { NFTSTORAGETOKEN, erc1155address, erc721address, nftmarketaddress } from '../../config';
import NFTMarket from '../../../server/artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import ERC721NFT from '../../../server/artifacts/contracts/ERC721.sol/ERC721NFT.json';
import ERC1155NFT from '../../../server/artifacts/contracts/ERC1155.sol/ERC1155NFT.json';
import { IFormInput, IItem } from '@/types/nft';
import axios from 'axios';
import { ipfsToHTTPS } from '@/helpers/ipfsToHTTPS';
import { INFURALINK } from '../../config';
import { NFTStorage } from 'nft.storage';
import { txtIcon, pdfIcon, docIcon, audioIcon, textIcon } from '../../public/icons';

const selectIcon = (fileType: string, image: string) => {
  const icons: any = {
    'text/plain': txtIcon,
    'application/pdf': pdfIcon,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': docIcon,
    'application/msword': docIcon,
    'application/json': textIcon,
    'audio/mpeg': audioIcon,
  };

  const icon = icons[fileType];

  if (icon) {
    return icon;
  } else {
    return ipfsToHTTPS(image);
  }
};
export const useMarket = () => {
  const client = new NFTStorage({ token: NFTSTORAGETOKEN });
  const { signer } = useSigner();
  const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

  const tokenContractERC721 = new ethers.Contract(erc721address, ERC721NFT.abi, signer);

  const tokenContractERC1155 = new ethers.Contract(erc1155address, ERC1155NFT.abi, signer);

  const loadNft = async () => {
    const data = await marketContract.fetchMyItems();

    const items: IItem[] = await Promise.all(
      data.map(async (i: any) => {
        let tokenUri;
        let amount;
        let owner;

        if (Number(i.tokenType) === 1) {
          tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
          owner = await tokenContractERC721.ownerOf(i.tokenId);
          amount = 1;
        } else {
          tokenUri = await tokenContractERC1155.uri(i.tokenId);
          amount = await tokenContractERC1155.balanceOf(i.owner, Number(i.tokenId));
        }
        const meta = await axios.get(ipfsToHTTPS(tokenUri));
        let price = ethers.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: Number(i.itemId),
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          image: selectIcon(meta.data.fileType, meta.data.image),
          name: meta.data.name,
          description: meta.data.description,
          tokenType: Number(i.tokenType),
          amount: Number(amount),
          fileType: meta.data.fileType,
        };
        return item;
      }),
    );

    const filteredItems = items.filter((item, index, self) => {
      return (
        item.amount > 0 &&
        self.findIndex((i) => i.tokenId === item.tokenId && i.tokenType === item.tokenType) ===
          index
      );
    });

    return filteredItems;
  };

  const loadMarketNfts = async () => {
    const provider = new ethers.JsonRpcProvider(INFURALINK);
    const tokenContractERC721 = new ethers.Contract(erc721address, ERC721NFT.abi, provider);

    const tokenContractERC1155 = new ethers.Contract(erc1155address, ERC1155NFT.abi, provider);
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);
    const data = await marketContract.fetchMarketItems();

    const items: IItem[] = await Promise.all(
      data.map(async (i: any) => {
        let tokenUri;

        if (Number(i.tokenType) === 1) {
          tokenUri = await tokenContractERC721.tokenURI(i.tokenId);
        } else {
          tokenUri = await tokenContractERC1155.uri(i.tokenId);
        }

        const meta = await axios.get(ipfsToHTTPS(tokenUri));
        let price = ethers.formatUnits(i.price.toString(), 'ether');

        let item = {
          price,
          itemId: Number(i.itemId),
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          image: selectIcon(meta.data.fileType, meta.data.image),
          name: meta.data.name,
          description: meta.data.description,
          tokenType: Number(i.tokenType),
          amount: Number(i.amount),
        };

        return item;
      }),
    );

    return items.filter((item) => item.amount > 0);
  };

  const BuyNft = async (nft: any) => {
    const transaction = await marketContract.buyItem(nft.itemId, nft.amount, {
      value: ethers.parseEther(nft.price),
    });

    await transaction.wait();
  };

  const listNft = async (nft: any, price: string, amount: string) => {
    const tokenId = nft.tokenId;

    if (Number(nft.tokenType) === 1) {
      let contract = new ethers.Contract(erc721address, ERC721NFT.abi, signer);
      let transaction = await contract.approve(nftmarketaddress, tokenId);
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      transaction = await contract.listItem(nft.itemId, ethers.parseUnits(price, 'ether'), 1);
      await transaction.wait();
    } else {
      let contract = new ethers.Contract(erc1155address, ERC1155NFT.abi, signer);
      let transaction = await contract.setApprovalForAll(nftmarketaddress, true);
      await transaction.wait();

      contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

      transaction = await contract.listItem(
        nft.itemId,
        ethers.parseUnits(price, 'ether'),
        Number(amount),
      );
      await transaction.wait();
    }
  };

  const create721 = async (data: IFormInput) => {
    const uploadedFile = data.image[0];
    const name = data.name;
    const description = data.description;

    const metadata = await client.store({
      name,
      description,
      image: uploadedFile,
      fileType: uploadedFile.type,
    });

    let contract = new ethers.Contract(erc721address, ERC721NFT.abi, signer);

    const tokenCreatedPromise = new Promise((resolve) => {
      contract.once('TokenCreated', (itemId) => {
        resolve(itemId);
      });
    });

    let transaction = await contract.createToken(metadata.url);
    const tokenId = await tokenCreatedPromise;

    await transaction.wait();

    transaction = await contract.setApprovalForAll(nftmarketaddress, true);
    await transaction.wait();

    contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

    transaction = await contract.createItem(erc721address, tokenId, 1, 1);
    await transaction.wait();
  };

  const create1155 = async (data: IFormInput) => {
    const uploadedFile = data.image[0];
    const name = data.name;
    const description = data.description;

    const metadata = await client.store({
      name,
      description,
      image: uploadedFile,
      fileType: uploadedFile.type,
    });

    let contract = new ethers.Contract(erc1155address, ERC1155NFT.abi, signer);

    const tokenCreatedPromise = new Promise((resolve) => {
      contract.once('TokenCreated', (itemId) => {
        resolve(itemId);
      });
    });

    let transaction = await contract.createToken(metadata.url, data.amount);
    const tokenId = await tokenCreatedPromise;

    await transaction.wait();

    transaction = await contract.setApprovalForAll(nftmarketaddress, true);
    await transaction.wait();

    contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

    transaction = await contract.createItem(erc1155address, tokenId, 1, data.amount);
    await transaction.wait();
  };

  return { loadNft, loadMarketNfts, BuyNft, listNft, create721, create1155 };
};
