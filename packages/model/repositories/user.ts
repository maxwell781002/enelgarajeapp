import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUser, UserModel } from "../prisma/zod";
import { UserRoles as BaseUserRoles } from "../prisma/generated/client";

export const UserRoles = BaseUserRoles;

export class UserRepository extends BaseRepository<
  CompleteUser,
  typeof prisma.user
> {
  constructor() {
    super(UserModel.omit({ id: true }), prisma.user);
  }

  getAll() {
    return this.model.findMany();
  }
}

export const userRepository = new UserRepository();
