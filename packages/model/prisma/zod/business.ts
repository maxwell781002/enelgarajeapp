import * as z from "zod";
import { BusinessPlan } from "../generated/client";
import {
  CompleteTelegramBusiness,
  RelatedTelegramBusinessModel,
  CompleteCategory,
  RelatedCategoryModel,
  CompleteProduct,
  RelatedProductModel,
  CompleteOrder,
  RelatedOrderModel,
  CompleteUserBusiness,
  RelatedUserBusinessModel,
} from "./index";

export const BusinessModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  address: z.string().nullish(),
  phone: z.string().nullish(),
  howToArrive: z.string().nullish(),
  coordinates: z.number().array(),
  slug: z.string().nullish(),
  active: z.boolean().optional(),
  requestAddress: z.boolean().optional(),
  plan: z.nativeEnum(BusinessPlan),
});

export interface CompleteBusiness extends z.infer<typeof BusinessModel> {
  telegram?: CompleteTelegramBusiness | null;
  categories: CompleteCategory[];
  products: CompleteProduct[];
  orders: CompleteOrder[];
  users: CompleteUserBusiness[];
}

/**
 * RelatedBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBusinessModel: z.ZodSchema<CompleteBusiness> = z.lazy(() =>
  BusinessModel.extend({
    telegram: RelatedTelegramBusinessModel.nullish(),
    categories: RelatedCategoryModel.array(),
    products: RelatedProductModel.array(),
    orders: RelatedOrderModel.array(),
    users: RelatedUserBusinessModel.array(),
  }),
);
