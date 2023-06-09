import { ConvertDatesToStrings } from '@/utils/types';

import type { Todo as TodoModel } from '@prisma/client';

export interface Todo extends ConvertDatesToStrings<TodoModel> {}
