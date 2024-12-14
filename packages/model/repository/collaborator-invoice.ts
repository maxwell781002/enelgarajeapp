import { UserIsNotCollaboratorError } from "../errors/bad-request";
import { EntityCreated, EntityUpdated } from "../lib/event-emitter/events";
import { updateCollaboratorProfileByInvoice } from "../listeners/collaborator-invoice";
import { transaction } from "../prisma/prisma-client";
import { businessRepository } from "../repositories/business";
import { collaboratorInvoiceRepository } from "../repositories/collaborator-invoice";
import { collaboratorProfileRepository } from "../repositories/collaborator-profile";
import { orderRepository } from "../repositories/order";
import { UserBusinessType } from "../types/enums";

export async function updateCollaboratorProfile(
  userId: string,
  businessId: string,
) {
  const collaborator = businessRepository.isUserBusiness(
    userId,
    businessId,
    UserBusinessType.COLLABORATOR,
  );
  if (!collaborator) {
    throw new UserIsNotCollaboratorError(
      `User ${userId} is not collaborator of business ${businessId}`,
    );
  }
  const statistic = await orderRepository.getCollaboratorStatistic(
    businessId,
    userId,
  );
  return collaboratorProfileRepository.updateProfile(
    userId,
    businessId,
    statistic,
  );
}

export const createCollaboratorInvoice = async ({ ordersId, ...data }: any) => {
  return transaction(async () => {
    const invoice = await collaboratorInvoiceRepository.create(data);
    await orderRepository.addCollaboratorInvoiceId(ordersId, invoice.id);
    await updateCollaboratorProfileByInvoice(new EntityCreated(invoice));
    return invoice;
  });
};

export const confirmInvoice = async (id: string) => {
  return transaction(async () => {
    const invoice = await collaboratorInvoiceRepository.confirmInvoice(id);
    await updateCollaboratorProfileByInvoice(new EntityUpdated(invoice));
    return invoice;
  });
};
