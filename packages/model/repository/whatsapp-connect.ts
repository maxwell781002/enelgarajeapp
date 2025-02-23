import { whatsappConnectRepository } from "../repositories/whatsapp-connect";
import { getBusinessById } from "./business";

export const getWhatsappConnectByBusinessId = (businessId: string) => {
  return whatsappConnectRepository.getByBusinessId(businessId);
};

export const updateByBusinessIdAndSecureCode = (
  businessId: string,
  secureCode: string,
  paringCode: string,
) => {
  return whatsappConnectRepository.updateByBusinessIdAndSecureCode(
    businessId,
    secureCode,
    paringCode,
  );
};

export const connectWhatsapp = async (businessId: string, phone: string) => {
  const business = await getBusinessById(businessId);
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  const entity = await whatsappConnectRepository.createWhatsappConnect(
    businessId,
    phone,
  );
  const { WHATSAPP_WEBHOOK_RETURN, WHATSAPP_CREATE_INSTANCE_URL } = process.env;
  console.log(
    `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
  );
  await fetch(WHATSAPP_CREATE_INSTANCE_URL as string, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
    },
    body: JSON.stringify({
      phone: entity.phone,
      webhook: `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
    }),
  });
  return entity;
};
