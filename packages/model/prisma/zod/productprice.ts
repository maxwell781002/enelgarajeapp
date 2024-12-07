import * as z from "zod";
import { CommissionType } from "../generated/client";
import { CompleteProduct, RelatedProductModel } from "./index";

export const ProductPriceModel = z.object({
  id: z.string(),
  commissionValue: z.number().int(),
  commissionType: z.nativeEnum(CommissionType),
  productId: z.string(),
});

export interface CompleteProductPrice
  extends z.infer<typeof ProductPriceModel> {
  product: CompleteProduct;
}

/**
 * RelatedProductPriceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductPriceModel: z.ZodSchema<CompleteProductPrice> =
  z.lazy(() =>
    ProductPriceModel.extend({
      product: RelatedProductModel,
    }),
  );
