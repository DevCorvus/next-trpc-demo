import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/server/features/auth/auth.config';

export const getSessionProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
  return {
    props: {
      session,
    },
  };
};
