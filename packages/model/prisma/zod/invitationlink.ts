import * as z from "zod";
import { CompleteBusiness, RelatedBusinessModel } from "./index";

export const InvitationLinkModel = z.object({
  id: z.string(),
  code: z.string(),
  businessId: z.string(),
  createdAt: z.date(),
});

export interface CompleteInvitationLink
  extends z.infer<typeof InvitationLinkModel> {
  business: CompleteBusiness;
}

/**
 * RelatedInvitationLinkModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInvitationLinkModel: z.ZodSchema<CompleteInvitationLink> =
  z.lazy(() =>
    InvitationLinkModel.extend({
      business: RelatedBusinessModel,
    }),
  );
