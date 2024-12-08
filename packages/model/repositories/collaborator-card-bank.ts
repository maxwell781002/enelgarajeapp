import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { PaginateData as BasePaginateData } from "../types/pagination";
import {
  CollaboratorCardBankModel,
  CompleteCollaboratorCardBank,
} from "../prisma/zod";

type PaginateData = {
  businessId: string;
  collaboratorId: string;
} & BasePaginateData;

export class CollaboratorCardBankRepository extends BaseRepository<
  CompleteCollaboratorCardBank,
  typeof Prisma.collaboratorCardBank
> {
  constructor() {
    super(
      CollaboratorCardBankModel.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }),
      Prisma.collaboratorCardBank,
    );
  }

  getAll(businessId: string, collaboratorId: string) {
    return this.model.findMany({
      where: { businessId, collaboratorId },
    });
  }

  paginate({ businessId, collaboratorId, ...data }: PaginateData) {
    const where: any = {
      businessId,
      collaboratorId,
    };
    return super.paginate({
      ...data,
      where,
    });
  }
}

export const collaboratorCardBankRepository =
  new CollaboratorCardBankRepository();
