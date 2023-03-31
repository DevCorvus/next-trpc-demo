import NextAuth from 'next-auth/next';

import { nextAuthOptions } from '@/server/features/auth/auth.config';

export default NextAuth(nextAuthOptions);
