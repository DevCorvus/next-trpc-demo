import { isAuthenticated } from '@/server/features/auth/auth.middleware';

import { procedure } from './index';

export const publicProcedure = procedure;
export const protectedProcedure = procedure.use(isAuthenticated);
