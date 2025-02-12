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
