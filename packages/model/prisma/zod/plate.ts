import * as z from "zod";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteCategory,
  RelatedCategoryModel,
} from "./index";

export const PlateModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullish(),
  image: z.string(),
  description: z.string(),
  price: z.number().int(),
  offerPrice: z.number().int().nullish(),
  ingredients: z.string().array(),
  images: z.string().array(),
  businessId: z.string(),
  categoryId: z.string(),
});

export interface CompletePlate extends z.infer<typeof PlateModel> {
  business: CompleteBusiness;
  category: CompleteCategory;
}

/**
 * RelatedPlateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlateModel: z.ZodSchema<CompletePlate> = z.lazy(() =>
  PlateModel.extend({
    business: RelatedBusinessModel,
    category: RelatedCategoryModel,
  }),
);
