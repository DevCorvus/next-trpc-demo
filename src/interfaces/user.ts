import { ConvertDatesToStrings } from '@/utils/types';

import type { User as UserModel } from '@prisma/client';

export interface User extends ConvertDatesToStrings<UserModel> {}
