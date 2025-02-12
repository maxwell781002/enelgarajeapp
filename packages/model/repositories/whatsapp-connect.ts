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

  getByBusinessId(businessId: string) {
    return this.model.findUnique({ where: { businessId } });
  }

  async updateByBusinessIdAndSecureCode(
    businessId: string,
    secureCode: string,
    paringCode: string,
  ) {
    const entity = await this.model.findUnique({
      where: { businessId, secureCode: secureCode },
    });
    if (!entity) {
      return null;
    }
    return this.model.update({
      where: { id: entity.id },
      data: {
        status: WhatsappConnectStatus.CODE_SENT,
        paringCode: paringCode,
        secureCode: "",
      },
    });
  }
}

export const whatsappConnectRepository = new WhatsappConnectRepository();
