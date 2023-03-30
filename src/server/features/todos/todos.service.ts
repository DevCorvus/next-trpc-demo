import { prisma } from '@/server/lib/prisma';
import { Todo } from '@prisma/client';

import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

interface TodosServiceInterface {
  findAll(): Promise<Todo[]>;
  findOne(id: number): Promise<Todo | null>;
  create(userId: number, data: CreateTodoDto): Promise<Todo>;
  update(id: number, data: UpdateTodoDto): Promise<Todo>;
  delete(id: number): Promise<Todo>;
  exists(id: number, userId?: number): Promise<boolean>;
}

export const todosService: TodosServiceInterface = {
  findAll() {
    return prisma.todo.findMany();
  },
  findOne(id) {
    return prisma.todo.findUnique({ where: { id } });
  },
  create(userId, data) {
    return prisma.todo.create({ data: { ...data, done: false, userId } });
  },
  update(id, data) {
    return prisma.todo.update({ where: { id }, data });
  },
  delete(id) {
    return prisma.todo.delete({ where: { id } });
  },
  async exists(id, userId) {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!todo) return false;
    if (!userId) return true;

    return todo.userId === userId;
  },
};
