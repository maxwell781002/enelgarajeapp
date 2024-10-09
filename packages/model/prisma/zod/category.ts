import * as z from "zod";
import {
  CompleteProduct,
  RelatedProductModel,
  CompleteBusiness,
  RelatedBusinessModel,
} from "./index";

export const CategoryModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "required" }),
  slug: z.string().nullish(),
  active: z.boolean().optional(),
  priority: z.number().int().optional(),
  businessId: z.string(),
});

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  products: CompleteProduct[];
  business: CompleteBusiness;
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() =>
  CategoryModel.extend({
    products: RelatedProductModel.array(),
    business: RelatedBusinessModel,
  }),
);
