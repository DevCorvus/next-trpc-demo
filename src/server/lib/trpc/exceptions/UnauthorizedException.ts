import { TRPCError } from '@trpc/server';

export class UnauthorizedException extends TRPCError {
  constructor() {
    super({ code: 'UNAUTHORIZED' });
  }
}
