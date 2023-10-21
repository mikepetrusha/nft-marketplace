export const ipfsToHTTPS = (url: string) => {
  if (!url.startsWith('ipfs://')) throw new Error('Not an IPFS url');
  const cid = url.substring(7);
  return `https://ipfs.io/ipfs/${cid}`;
};
