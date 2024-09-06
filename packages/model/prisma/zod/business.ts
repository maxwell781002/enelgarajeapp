import * as z from "zod"
import { CompleteCategory, RelatedCategoryModel, CompleteProduct, RelatedProductModel, CompleteOrder, RelatedOrderModel } from "./index"

export const BusinessModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  address: z.string().nullish(),
  howToArrive: z.string().nullish(),
  coordinates: z.number().array(),
  slug: z.string().nullish(),
})

export interface CompleteBusiness extends z.infer<typeof BusinessModel> {
  categories: CompleteCategory[]
  products: CompleteProduct[]
  orders: CompleteOrder[]
}

/**
 * RelatedBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBusinessModel: z.ZodSchema<CompleteBusiness> = z.lazy(() => BusinessModel.extend({
  categories: RelatedCategoryModel.array(),
  products: RelatedProductModel.array(),
  orders: RelatedOrderModel.array(),
}))
