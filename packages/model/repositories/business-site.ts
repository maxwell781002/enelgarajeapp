import { BaseRepository } from "../lib/base-repository";
import { deleteFile, uploadFile } from "../lib/upload_file";
import { Prisma } from "../prisma/prisma-client";
import { BusinessSiteModel, CompleteBusinessSite } from "../prisma/zod";

export class BusinessSiteRepository extends BaseRepository<
  CompleteBusinessSite,
  typeof Prisma.address
> {
  constructor() {
    super(BusinessSiteModel.omit({ id: true }), "businessSite");
  }

  protected doCreate(data: any) {
    const { businessId, ...rest } = data;
    return uploadFile(
      `business_sites/${businessId}`,
      rest.logo,
      async (blob) => {
        const entity = await super.doCreate({
          ...this.getObject(rest),
          businessId,
          logo: blob,
        });
        return entity;
      },
    );
  }

  protected async doUpdate(id: string, data: any) {
    const { businessId, ...rest } = data;
    const originalEntity = await super.getById(id);
    return uploadFile(
      `business_sites/${businessId}`,
      rest.logo,
      async (blob) => {
        const entity = await super.doUpdate(id, {
          ...this.getObject(rest),
          businessId,
          logo: blob,
        });
        await deleteFile(originalEntity.logo.url);
        return entity;
      },
    );
  }
}

export const businessSiteRepository = new BusinessSiteRepository();
