import '@/styles/globals.css';

import Layout from '@/components/Layout';
import { trpc } from '@/lib/trpc-client';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default trpc.withTRPC(App);
