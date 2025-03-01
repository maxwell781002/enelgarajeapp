import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { WhatsappConnectModel, CompleteWhatsappConnect } from "../prisma/zod";
import { WhatsappConnectStatus } from "../types/enums";

export class WhatsappConnectRepository extends BaseRepository<
  CompleteWhatsappConnect,
  typeof Prisma.whatsappConnect
> {
  constructor() {
    super(WhatsappConnectModel.omit({ id: true }), "whatsappConnect");
  }

  findByPhone(phone: string) {
    return this.model.findUnique({ where: { phone } });
  }

  createWhatsappConnect(phone: string) {
    const secureCode = Math.floor(100000 + Math.random() * 900000).toString();
    return this.model.create({
      data: { secureCode, phone },
    });
  }

  async updateSecureCode(id: string, secureCode: string, paringCode: string) {
    const entity = await this.model.findUnique({
      where: { id, secureCode },
    });
    if (!entity) {
      return null;
    }
    return this.model.update({
      where: { id: entity.id },
      data: {
        status: WhatsappConnectStatus.CODE_SENT,
        paringCode,
        secureCode: "",
      },
    });
  }
}

export const whatsappConnectRepository = new WhatsappConnectRepository();
