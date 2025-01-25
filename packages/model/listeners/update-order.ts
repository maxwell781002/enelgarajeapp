import { OrderPayed } from "../lib/event-emitter/events";
import { updateCollaboratorProfile } from "../repository/collaborator-profile";

export const updateCollaboratorProfileListener = (event: OrderPayed) => {
  const order = event.data;
  const userId = order.isCollaborator ? order.userId : order.referredById;
  if (userId) {
    return updateCollaboratorProfile(
      userId as string,
      order.businessId as string,
    );
  }
};
