import Layout from '@/components/Layout';
import { trpc } from '@/server/utils/trpc-client';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default trpc.withTRPC(App);
