import { isValidFormOfPaymentType } from "../lib/utils";
import { CollaboratorTicketModel } from "../prisma/zod";
import { z } from "zod";

export const CollaboratorTicketForm = CollaboratorTicketModel.omit({
  id: true,
  businessId: true,
  customerId: true,
  orderId: true,
  collaboratorId: true,
  phone: true,
}).refine(
  (val) =>
    val.formOfPayment &&
    val.currency &&
    isValidFormOfPaymentType(val.formOfPayment, val.currency),
  {
    message: "invalidFormOfPayment",
    path: ["formOfPayment"],
  },
);

export type TCollaboratorTicketForm = z.infer<typeof CollaboratorTicketForm>;
