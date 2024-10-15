import * as z from "zod";
import { CompleteBusiness, RelatedBusinessModel } from "./index";

export const TelegramBusinessModel = z.object({
  id: z.string(),
  groupId: z.string().min(1, { message: "Required" }),
  invitationLink: z.string().optional(),
  businessId: z.string(),
});

export interface CompleteTelegramBusiness
  extends z.infer<typeof TelegramBusinessModel> {
  business: CompleteBusiness;
}

/**
 * RelatedTelegramBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTelegramBusinessModel: z.ZodSchema<CompleteTelegramBusiness> =
  z.lazy(() =>
    TelegramBusinessModel.extend({
      business: RelatedBusinessModel,
    }),
  );
