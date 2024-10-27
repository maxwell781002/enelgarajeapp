import * as z from "zod";
import {
  CompleteUserAddress,
  RelatedUserAddressModel,
  CompleteOrderAddress,
  RelatedOrderAddressModel,
} from "./index";

export const AddressModel = z.object({
  id: z.string(),
  alias: z.string().min(1, { message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
  address: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  reference: z.string().optional().nullish(),
});

export interface CompleteAddress extends z.infer<typeof AddressModel> {
  userAddress?: CompleteUserAddress | null;
  orderAddress?: CompleteOrderAddress | null;
}

/**
 * RelatedAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressModel: z.ZodSchema<CompleteAddress> = z.lazy(() =>
  AddressModel.extend({
    userAddress: RelatedUserAddressModel.nullish(),
    orderAddress: RelatedOrderAddressModel.nullish(),
  }),
);
