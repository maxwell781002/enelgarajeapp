import * as z from "zod";
import {
  CompleteProduct,
  RelatedProductModel,
  CompleteOrder,
  RelatedOrderModel,
} from "./index";

export const OrderProductModel = z.object({
  productId: z.string(),
  orderId: z.string(),
  price: z.number().int(),
  position: z.number().int(),
  quantity: z.number().int(),
});

export interface CompleteOrderProduct
  extends z.infer<typeof OrderProductModel> {
  product: CompleteProduct;
  order: CompleteOrder;
}

/**
 * RelatedOrderProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderProductModel: z.ZodSchema<CompleteOrderProduct> =
  z.lazy(() =>
    OrderProductModel.extend({
      product: RelatedProductModel,
      order: RelatedOrderModel,
    }),
  );
