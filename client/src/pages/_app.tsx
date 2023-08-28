import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Marketplace</p>
        <div className="flex mt-4">
          <Link className="mr-6 text-pink-500" href="/">
            Home
          </Link>
          <Link className="mr-6 text-pink-500" href="/create-item">
            Create ERC721
          </Link>
          <Link className="mr-6 text-pink-500" href="/create-item1155">
            Create ERC1155
          </Link>
          <Link className="mr-6 text-pink-500" href="/my-nfts">
            My NFTs
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
