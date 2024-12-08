import * as z from "zod";
import { Currency } from "../generated/client";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

export const CollaboratorCardBankModel = z.object({
  id: z.string(),
  alias: z.string().optional().nullish(),
  cardNumber: z.string().min(1, { message: "Required" }),
  currency: z.nativeEnum(Currency),
  phone: z.string().min(1, { message: "required" }),
  businessId: z.string(),
  collaboratorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCollaboratorCardBank
  extends z.infer<typeof CollaboratorCardBankModel> {
  business: CompleteBusiness;
  collaborator: CompleteUser;
}

/**
 * RelatedCollaboratorCardBankModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollaboratorCardBankModel: z.ZodSchema<CompleteCollaboratorCardBank> =
  z.lazy(() =>
    CollaboratorCardBankModel.extend({
      business: RelatedBusinessModel,
      collaborator: RelatedUserModel,
    }),
  );
