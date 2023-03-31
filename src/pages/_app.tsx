import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import { trpc } from '@/lib/trpc-client';

import type { AppProps } from 'next/app';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
