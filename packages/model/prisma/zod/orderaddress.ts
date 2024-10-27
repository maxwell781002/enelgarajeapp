import * as z from "zod";
import {
  CompleteAddress,
  RelatedAddressModel,
  CompleteOrder,
  RelatedOrderModel,
} from "./index";

export const OrderAddressModel = z.object({
  id: z.string(),
  addressId: z.string(),
  orderId: z.string(),
});

export interface CompleteOrderAddress
  extends z.infer<typeof OrderAddressModel> {
  address: CompleteAddress;
  order: CompleteOrder;
}

/**
 * RelatedOrderAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderAddressModel: z.ZodSchema<CompleteOrderAddress> =
  z.lazy(() =>
    OrderAddressModel.extend({
      address: RelatedAddressModel,
      order: RelatedOrderModel,
    }),
  );
