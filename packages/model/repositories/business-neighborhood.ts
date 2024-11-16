import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { PaginateData as BasePaginateData } from "../types/pagination";
import {
  BusinessNeighborhoodModel,
  CompleteBusinessNeighborhood,
} from "../prisma/zod/businessneighborhood";

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class BusinessNeighborhoodRepository extends BaseRepository<
  CompleteBusinessNeighborhood,
  typeof Prisma.businessNeighborhood
> {
  constructor() {
    super(
      BusinessNeighborhoodModel.omit({ id: true }),
      Prisma.businessNeighborhood,
    );
  }

  paginate({ businessId, query, ...data }: PaginateData = {}) {
    const where: any = {
      businessId,
    };
    if (query) {
      where["neighborhood"] = {
        name: {
          contains: query,
          mode: "insensitive",
        },
      };
    }
    return super.paginate({
      ...data,
      where,
      include: {
        neighborhood: true,
      },
    });
  }

  getByCityAndBusiness(businessId: string, city: string) {
    return this.model.findMany({
      where: { neighborhood: { city }, businessId },
    });
  }

  getByBusinessIdAndNeighborhoodId(businessId: string, neighborhoodId: string) {
    return this.model.findFirst({
      where: { businessId, neighborhoodId },
    });
  }
}

export const businessNeighborhoodRepository =
  new BusinessNeighborhoodRepository();
