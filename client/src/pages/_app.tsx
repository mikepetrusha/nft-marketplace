import { Layout } from '@/components/Layout';
import { SignerProvider } from '@/hooks/useSigner';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SignerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SignerProvider>
  );
}
