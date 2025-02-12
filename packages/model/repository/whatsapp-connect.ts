import { whatsappConnectRepository } from "../repositories/whatsapp-connect";

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
  const entity = await whatsappConnectRepository.createWhatsappConnect(
    businessId,
    phone,
  );
  const { WHATSAPP_WEBHOOK_RETURN, WHATSAPP_CREATE_INSTANCE_URL } = process.env;
  await fetch(WHATSAPP_CREATE_INSTANCE_URL as string, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: entity.phone,
      webhook: `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
    }),
  });
  return entity;
};
