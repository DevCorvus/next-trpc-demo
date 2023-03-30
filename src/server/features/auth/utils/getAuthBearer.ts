import { NextApiRequest } from 'next';

export function getAuthBearer(req: NextApiRequest): string | null {
  return req.headers.authorization?.split(' ')[1] || null;
}
