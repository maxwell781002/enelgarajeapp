import * as z from "zod";
import { Currency, FormOfPaymentType } from "../generated/client";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteCustomer,
  RelatedCustomerModel,
  CompleteOrder,
  RelatedOrderModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

export const CollaboratorTicketModel = z.object({
  id: z.string(),
  deliveryDate: z.date(),
  currency: z.nativeEnum(Currency),
  formOfPayment: z.nativeEnum(FormOfPaymentType),
  phone: z.string(),
  nota: z.string(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, { message: "ticketTermsConditions" }),
  businessId: z.string(),
  customerId: z.string(),
  orderId: z.string(),
  collaboratorId: z.string(),
});

export interface CompleteCollaboratorTicket
  extends z.infer<typeof CollaboratorTicketModel> {
  business: CompleteBusiness;
  customer: CompleteCustomer;
  order: CompleteOrder;
  collaborator: CompleteUser;
}

/**
 * RelatedCollaboratorTicketModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollaboratorTicketModel: z.ZodSchema<CompleteCollaboratorTicket> =
  z.lazy(() =>
    CollaboratorTicketModel.extend({
      business: RelatedBusinessModel,
      customer: RelatedCustomerModel,
      order: RelatedOrderModel,
      collaborator: RelatedUserModel,
    }),
  );
