import { Prisma, transaction } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CollaboratorInvoiceModel,
  CompleteCollaboratorInvoice,
} from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { clearWhere } from "../lib/util-query";

type PaginateData = {
  businessId?: string;
  collaboratorId?: string;
  status?: string;
} & BasePaginateData;

export class CollaboratorInvoiceRepository extends BaseRepository<
  CompleteCollaboratorInvoice,
  typeof Prisma.collaboratorInvoice
> {
  constructor() {
    super(
      CollaboratorInvoiceModel.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }),
      Prisma.collaboratorInvoice,
    );
  }

  paginate({ businessId, collaboratorId, ...props }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
      collaboratorId,
    });
    return super.paginate({
      ...props,
      where,
      orderBy: { createdAt: "desc" },
      include: { cardBank: true },
    });
  }

  async confirmInvoice(id: string) {
    return this.model.update({
      where: { id },
      data: { confirmed: true },
    });
  }

  getTotalToConfirm(businessId: string, collaboratorId: string) {
    return this.model.count({
      where: {
        businessId,
        collaboratorId,
        confirmed: false,
      },
    });
  }
}

export const collaboratorInvoiceRepository =
  new CollaboratorInvoiceRepository();
