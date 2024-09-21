import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteBusiness,
  RelatedBusinessModel,
} from "./index";

export const UserBusinessModel = z.object({
  userId: z.string(),
  businessId: z.string(),
});

export interface CompleteUserBusiness
  extends z.infer<typeof UserBusinessModel> {
  user: CompleteUser;
  business: CompleteBusiness;
}

/**
 * RelatedUserBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserBusinessModel: z.ZodSchema<CompleteUserBusiness> =
  z.lazy(() =>
    UserBusinessModel.extend({
      user: RelatedUserModel,
      business: RelatedBusinessModel,
    }),
  );
