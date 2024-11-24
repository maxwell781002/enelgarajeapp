import * as z from "zod";
import { OrderStatus } from "../generated/client";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteOrderProduct,
  RelatedOrderProductModel,
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteOrderAddress,
  RelatedOrderAddressModel,
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
  shipping: z.number().int(),
  hasShipping: z.boolean(),
  total: z.number().int(),
  status: z.nativeEnum(OrderStatus),
  sentAt: z.date().nullish(),
  position: z.number().int().nullish(),
  businessId: z.string().nullish(),
  identifier: z.string().nullish(),
});

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  user?: CompleteUser | null;
  items: CompleteOrderProduct[];
  business?: CompleteBusiness | null;
  orderAddress?: CompleteOrderAddress | null;
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
    business: RelatedBusinessModel.nullish(),
    orderAddress: RelatedOrderAddressModel.nullish(),
  }),
);
