import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
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

export const OrderModel = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  productsDetails: jsonSchema,
  total: z.number().int(),
});

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  user?: CompleteUser | null;
  items: CompleteOrderProduct[];
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() =>
  OrderModel.extend({
    user: RelatedUserModel.nullish(),
    items: RelatedOrderProductModel.array(),
  }),
);
