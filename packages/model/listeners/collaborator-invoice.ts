import { EntityCreated, EntityUpdated } from "../lib/event-emitter/events";
import { updateCollaboratorProfile } from "../repository/collaborator-invoice";

export const updateCollaboratorProfileByInvoice = (
  event: EntityCreated | EntityUpdated,
) => {
  const invoice = event.data;
  return updateCollaboratorProfile(invoice.collaboratorId, invoice.businessId);
};
