import { businessRepository } from "../repositories/business";
import { headers } from "next/headers";
import { telegramBusinessRepository } from "../repositories/telegram-business";

export const getCurrentBusiness = async () => {
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  return hostname ? businessRepository.getBySlugAndActive(hostname) : null;
};

export const getBusinessById = async (businessId: string) => {
  return businessRepository.getById(businessId);
};

export const getAllBusinessData = (businessId: string) => {
  return businessRepository.getAllBusinessData(businessId);
};

export const createOrUpdateBusiness = async (
  business: any,
  businessId: string = "",
) => {
  const telegram = business.telegram;
  delete business.telegram;
  let entity;
  if (businessId) {
    entity = await businessRepository.update(businessId, business);
  } else {
    entity = await businessRepository.create(business);
    businessId = entity.id;
  }
  if (telegram) {
    await telegramBusinessRepository.createOrUpdateTelegram(
      businessId,
      telegram,
    );
  } else {
    await telegramBusinessRepository.removeByBusinessId(businessId);
  }
  return entity;
};
