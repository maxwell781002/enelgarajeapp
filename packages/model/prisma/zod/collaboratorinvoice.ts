import * as z from "zod";
import { Currency } from "../generated/client";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteUser,
  RelatedUserModel,
  CompleteCollaboratorCardBank,
  RelatedCollaboratorCardBankModel,
  CompleteOrder,
  RelatedOrderModel,
} from "./index";

export const CollaboratorInvoiceModel = z.object({
  id: z.string(),
  businessId: z.string(),
  collaboratorId: z.string(),
  cardBankId: z.string(),
  amount: z.number().int(),
  currency: z.nativeEnum(Currency),
  transferCode: z.string().min(1, { message: "Required" }),
  businessNota: z.string().nullish(),
  collaboratorNota: z.string().nullish(),
  confirmed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCollaboratorInvoice
  extends z.infer<typeof CollaboratorInvoiceModel> {
  business: CompleteBusiness;
  collaborator: CompleteUser;
  cardBank: CompleteCollaboratorCardBank;
  orders: CompleteOrder[];
}

/**
 * RelatedCollaboratorInvoiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollaboratorInvoiceModel: z.ZodSchema<CompleteCollaboratorInvoice> =
  z.lazy(() =>
    CollaboratorInvoiceModel.extend({
      business: RelatedBusinessModel,
      collaborator: RelatedUserModel,
      cardBank: RelatedCollaboratorCardBankModel,
      orders: RelatedOrderModel.array(),
    }),
  );
