import { collaboratorTicketRepository } from "../repositories/collaborator-ticket";
import { TCollaboratorTicketForm } from "../validation/collaborator-ticket";

export const createCollaboratorTicket = async (
  data: TCollaboratorTicketForm,
  businessId: string,
  customerId: string,
  orderId: string,
  collaboratorId: string,
  phone: string,
) => {
  return collaboratorTicketRepository.create({
    ...data,
    businessId,
    customerId,
    orderId,
    collaboratorId,
    phone,
  });
};
