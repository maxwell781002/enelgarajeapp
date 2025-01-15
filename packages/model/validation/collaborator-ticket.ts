import { CollaboratorTicketModel } from "../prisma/zod";
import { z } from "zod";

export const CollaboratorTicketForm = CollaboratorTicketModel.omit({
  id: true,
  businessId: true,
  customerId: true,
  orderId: true,
  collaboratorId: true,
  phone: true,
});

export type TCollaboratorTicketForm = z.infer<typeof CollaboratorTicketForm>;
