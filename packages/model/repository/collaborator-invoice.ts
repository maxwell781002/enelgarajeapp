import { OrderAreTheDifferentUserError } from "../errors/bad-request";
import { EntityCreated, EntityUpdated } from "../lib/event-emitter/events";
import { updateCollaboratorProfileByInvoice } from "../listeners/collaborator-invoice";
import { transaction } from "../prisma/prisma-client";
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

export const createCollaboratorInvoice = async ({
  ordersId,
  businessId,
  collaboratorId,
  ...data
}: any) => {
  await isUserBusiness(
    collaboratorId,
    businessId,
    UserBusinessType.COLLABORATOR,
  );
  if (
    !(await orderRepository.isOrdersByTheSameUser(ordersId, collaboratorId))
  ) {
    throw new OrderAreTheDifferentUserError();
  }
  return transaction(async () => {
    const invoice = await collaboratorInvoiceRepository.create({
      ...data,
      businessId,
      collaboratorId,
    });
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
