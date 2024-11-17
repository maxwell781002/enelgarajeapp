import * as z from "zod";
import {
  CompleteAddress,
  RelatedAddressModel,
  CompleteUser,
  RelatedUserModel,
  CompleteBusiness,
  RelatedBusinessModel,
} from "./index";

export const UserAddressModel = z.object({
  id: z.string(),
  addressId: z.string(),
  userId: z.string(),
  businessId: z.string().nullish(),
});

export interface CompleteUserAddress extends z.infer<typeof UserAddressModel> {
  address: CompleteAddress;
  user: CompleteUser;
  business?: CompleteBusiness | null;
}

/**
 * RelatedUserAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserAddressModel: z.ZodSchema<CompleteUserAddress> = z.lazy(
  () =>
    UserAddressModel.extend({
      address: RelatedAddressModel,
      user: RelatedUserModel,
      business: RelatedBusinessModel.nullish(),
    }),
);
