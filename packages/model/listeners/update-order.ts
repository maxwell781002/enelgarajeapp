import { OrderPayed } from "../lib/event-emitter/events";
import { updateCollaboratorProfile } from "../repository/collaborator-profile";

export const updateCollaboratorProfileListener = (event: OrderPayed) => {
  const order = event.data;
  if (order.isCollaborator) {
    return updateCollaboratorProfile(
      order.userId as string,
      order.businessId as string,
    );
  }
};
