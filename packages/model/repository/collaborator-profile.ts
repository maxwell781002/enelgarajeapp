import { collaboratorInvoiceRepository } from "../repositories/collaborator-invoice";
import { collaboratorProfileRepository } from "../repositories/collaborator-profile";
import { orderRepository } from "../repositories/order";
import { UserBusinessType } from "../types/enums";
import { isUserBusiness } from "./business";

export async function updateCollaboratorProfile(
  userId: string,
  businessId: string,
) {
  await isUserBusiness(userId, businessId, UserBusinessType.COLLABORATOR);
  const statistic: any = await orderRepository.getCollaboratorStatistic(
    businessId,
    userId,
  );
  const totalPendingInvoiceToConfirm =
    await collaboratorInvoiceRepository.getTotalToConfirm(businessId, userId);
  statistic.totalPendingInvoiceToConfirm = totalPendingInvoiceToConfirm;
  return collaboratorProfileRepository.updateProfile(
    userId,
    businessId,
    statistic,
  );
}
