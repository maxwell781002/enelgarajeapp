import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { PaginateData as BasePaginateData } from "../types/pagination";
import {
  CompleteNeighborhood,
  NeighborhoodModel,
} from "../prisma/zod/neighborhood";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class NeighborhoodRepository extends BaseRepository<
  CompleteNeighborhood,
  typeof Prisma.neighborhood
> {
  constructor() {
    super(NeighborhoodModel.omit({ id: true }), Prisma.neighborhood);
  }

  paginate({ businessId, query, ...data }: PaginateData = {}) {
    const where: any = {
      businessId,
    };
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
    return super.paginate({
      ...data,
      where,
    });
  }
}

export const neighborhoodRepository = new NeighborhoodRepository();
