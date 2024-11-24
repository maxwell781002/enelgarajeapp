import * as z from "zod";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteCategory,
  RelatedCategoryModel,
  CompleteOrderProduct,
  RelatedOrderProductModel,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const ProductModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Required" }),
  slug: z.string().nullish(),
  image: jsonSchema,
  description: z.string().min(1, { message: "Required" }),
  price: z.number().int().gte(0),
  offerPrice: z.number().int().gte(0).nullish(),
  images: jsonSchema.array(),
  active: z.boolean().optional(),
  isNew: z.boolean().optional(),
  priority: z.number().int().optional(),
  stock: z.number().int().min(0),
  allowOrderOutOfStock: z.boolean(),
  isExhaustible: z.boolean(),
  businessId: z.string(),
  categoryId: z.string().nullish(),
});

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  business: CompleteBusiness;
  category?: CompleteCategory | null;
  orderItems: CompleteOrderProduct[];
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() =>
  ProductModel.extend({
    business: RelatedBusinessModel,
    category: RelatedCategoryModel.nullish(),
    orderItems: RelatedOrderProductModel.array(),
  }),
);
