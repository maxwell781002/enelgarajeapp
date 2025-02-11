import { whatsappConnectRepository } from "../repositories/whatsapp-connect";

export const getWhatsappConnectByBusinessId = (businessId: string) => {
  return whatsappConnectRepository.getByBusinessId(businessId);
};
