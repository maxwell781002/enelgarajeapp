import * as z from "zod"
import { CompleteBusiness, RelatedBusinessModel } from "./index"

export const CategoryModel = z.object({
  id: z.string(),
  name: z.string(),
  businessId: z.string(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  business: CompleteBusiness
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  business: RelatedBusinessModel,
}))
