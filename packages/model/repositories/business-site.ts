import { BaseRepository } from "../lib/base-repository";
import { deleteFile, uploadFile } from "../lib/upload_file";
import { Prisma } from "../prisma/prisma-client";
import { BusinessSiteModel, CompleteBusinessSite } from "../prisma/zod";
import {
  BusinessSiteUpdateValidation,
  BusinessSiteValidation,
} from "../validation/business-site";

const businessImageFolder = (businessId: string) =>
  `business_sites/${businessId}`;

export class BusinessSiteRepository extends BaseRepository<
  CompleteBusinessSite,
  typeof Prisma.address
> {
  constructor() {
    super(BusinessSiteModel.omit({ id: true }), "businessSite");
  }

  protected init() {
    this.addValidator("create", BusinessSiteValidation);
    this.addValidator("update", BusinessSiteUpdateValidation);
  }

  protected doCreate(data: any) {
    const { businessId, ...rest } = data;
    return uploadFile(
      businessImageFolder(businessId),
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
    const { businessId, logo, ...rest } = data;
    const originalEntity = await super.getById(id);
    return uploadFile(businessImageFolder(businessId), logo, async (blob) => {
      const newData = {
        ...this.getObject(rest),
        businessId,
      };
      if (blob) {
        newData.logo = blob;
      }
      const entity = await super.doUpdate(id, newData);
      if (logo && originalEntity.logo) {
        await deleteFile(originalEntity.logo.url);
      }
      return entity;
    });
  }

  getByBusinessId(businessId: string) {
    return this.model.findUnique({ where: { businessId } });
  }
}

export const businessSiteRepository = new BusinessSiteRepository();
