import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteTelegramBusiness, TelegramBusinessModel } from "../prisma/zod";

export class TelegramBusinessRepository extends BaseRepository<
  CompleteTelegramBusiness,
  typeof prisma.telegramBusiness
> {
  constructor() {
    super(TelegramBusinessModel.omit({ id: true }), prisma.telegramBusiness);
  }

  getAll() {
    return this.model.findMany();
  }
}

export const telegramBusinessRepository = new TelegramBusinessRepository();
