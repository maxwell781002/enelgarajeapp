import { Prisma, transaction } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CollaboratorInvoiceModel,
  CompleteCollaboratorInvoice,
} from "../prisma/zod";
import { updateCollaboratorProfileByInvoice } from "../listeners/collaborator-invoice";
import { EntityUpdated } from "../lib/event-emitter/events";
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

  protected doUpdate(id: string, data: any) {
    return transaction(async () => {
      const entity = await super.doUpdate(id, data);
      await updateCollaboratorProfileByInvoice(new EntityUpdated(entity));
      return entity;
    });
  }

  paginate({ businessId, collaboratorId, ...props }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
      collaboratorId,
    });
    return super.paginate({ ...props, where, orderBy: { createdAt: "desc" } });
  }
}

export const collaboratorInvoiceRepository =
  new CollaboratorInvoiceRepository();
