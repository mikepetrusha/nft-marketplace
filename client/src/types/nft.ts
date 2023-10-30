export interface IItem {
  price: string;
  itemId: number;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenType: number;
  amount: number;
  fileType: string;
}

export interface IFormInput {
  name: string;
  description: string;
  image: File[];
  amount?: string;
}
