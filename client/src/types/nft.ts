export interface IItem {
  price?: string;
  itemId: number;
  tokenId: number;
  seller?: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  sold?: boolean;
  tokenType: number;
  amount: number;
}
