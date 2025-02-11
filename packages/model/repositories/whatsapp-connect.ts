import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { WhatsappConnectModel, CompleteWhatsappConnect } from "../prisma/zod";

export class WhatsappConnectRepository extends BaseRepository<
  CompleteWhatsappConnect,
  typeof Prisma.whatsappConnect
> {
  constructor() {
    super(WhatsappConnectModel.omit({ id: true }), "whatsappConnect");
  }

  getByBusinessId(businessId: string) {
    return this.model.findUnique({ where: { businessId } });
  }
}

export const whatsappConnectRepository = new WhatsappConnectRepository();
