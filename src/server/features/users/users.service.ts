import { prisma } from '@/server/lib/prisma';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './user.dto';

interface UsersServiceInterface {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: number, data: UpdateUserDto): Promise<User>;
  delete(id: number): Promise<User>;
  exists(id: number): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}

export const usersService: UsersServiceInterface = {
  findAll() {
    return prisma.user.findMany();
  },
  findOne(id) {
    return prisma.user.findUnique({ where: { id } });
  },
  findOneByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  create(data) {
    return prisma.user.create({ data });
  },
  update(id, data) {
    return prisma.user.update({ where: { id }, data });
  },
  delete(id) {
    return prisma.user.delete({ where: { id } });
  },
  async exists(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
    return Boolean(user);
  },
  async existsByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return Boolean(user);
  },
};
