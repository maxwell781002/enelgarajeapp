import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteTelegramBusiness, TelegramBusinessModel } from "../prisma/zod";

export class TelegramBusinessRepository extends BaseRepository<
  CompleteTelegramBusiness,
  typeof Prisma.telegramBusiness
> {
  constructor() {
    super(TelegramBusinessModel.omit({ id: true }), Prisma.telegramBusiness);
  }

  getAll() {
    return this.model.findMany();
  }

  createOrUpdateTelegram(businessId: string, data: any) {
    if (!data) return;
    const dataBusiness = {
      ...data,
      businessId,
    };
    return prisma().telegramBusiness.upsert({
      where: { businessId },
      create: dataBusiness,
      update: dataBusiness,
    });
  }

  removeByBusinessId(businessId: string) {
    return prisma().telegramBusiness.deleteMany({ where: { businessId } });
  }

  getByBusinessId(businessId: string) {
    return this.model.findUnique({ where: { businessId } });
  }
}

export const telegramBusinessRepository = new TelegramBusinessRepository();
