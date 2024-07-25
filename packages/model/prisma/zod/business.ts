import * as z from "zod"
import { CompleteCategory, RelatedCategoryModel, CompletePlate, RelatedPlateModel } from "./index"

export const BusinessModel = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompleteBusiness extends z.infer<typeof BusinessModel> {
  categories: CompleteCategory[]
  plates: CompletePlate[]
}

/**
 * RelatedBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBusinessModel: z.ZodSchema<CompleteBusiness> = z.lazy(() => BusinessModel.extend({
  categories: RelatedCategoryModel.array(),
  plates: RelatedPlateModel.array(),
}))
