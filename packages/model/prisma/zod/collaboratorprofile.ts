import * as z from "zod";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

export const CollaboratorProfileModel = z.object({
  id: z.string(),
  businessId: z.string(),
  collaboratorId: z.string(),
  historicalProfit: z.number().int(),
  totalPendingInvoiceToConfirm: z.number().int(),
  totalOrderForPayment: z.number().int(),
  totalBusinessProfit: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCollaboratorProfile
  extends z.infer<typeof CollaboratorProfileModel> {
  business: CompleteBusiness;
  collaborator: CompleteUser;
}

/**
 * RelatedCollaboratorProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollaboratorProfileModel: z.ZodSchema<CompleteCollaboratorProfile> =
  z.lazy(() =>
    CollaboratorProfileModel.extend({
      business: RelatedBusinessModel,
      collaborator: RelatedUserModel,
    }),
  );
