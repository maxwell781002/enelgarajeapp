import * as z from "zod"
import { CompleteBusiness, RelatedBusinessModel, CompleteCategory, RelatedCategoryModel, CompleteOrderProduct, RelatedOrderProductModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullish(),
  image: z.string(),
  description: z.string(),
  price: z.number().int(),
  offerPrice: z.number().int().nullish(),
  images: z.string().array(),
  businessId: z.string(),
  categoryId: z.string(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  business: CompleteBusiness
  category: CompleteCategory
  orderItems: CompleteOrderProduct[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  business: RelatedBusinessModel,
  category: RelatedCategoryModel,
  orderItems: RelatedOrderProductModel.array(),
}))
